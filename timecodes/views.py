from django.http import HttpResponse
from django.shortcuts import render, redirect
from timecodes.models import Timecode
from .forms import DocumentForm
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_control
from django.urls import reverse_lazy
from youtubesearchpython import VideosSearch
import requests
import re
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm


def get_current_dates():
  today = datetime.today().strftime('%Y-%m-%d')
  date_obj = datetime.strptime(today, "%Y-%m-%d")
  formatted_date = date_obj.strftime("%d.%m")

  date_data = {'today': today, 'formatted_date': formatted_date}
  return date_data


date_data = get_current_dates()
today = date_data['today']
formatted_date = date_data['formatted_date']


#@csrf_exempt
def home(request):
  if request.method == 'GET':
    timecodes = Timecode.objects.all().order_by('-date', '-pageId')
    return render(request, 'home.html', {'timecodes': timecodes})
  elif request.method == 'POST':
    try:
      print("YA RODILSA!!!")
      category = request.POST.get('category', '')
      video = getStream(formatted_date)
      if category == "Утренний":
        image = "utro.jpg"
      elif category == "Ночной":
        image = "noch.jpg"
      elif category == "В глаза посмотреть":
        image = "vgp.jpg"
      elif category == "Время сознания":
        image = "vremya.jpg"
      elif category == "РЗГВР":
        image = "rzgvrOB.png"
      elif category == "Родственники приехали":
        image = "play.jpg"
      else:
        image = "drugoe.jpg"

      timecode = Timecode.objects.create(category=category,
                                         date=today,
                                         title=category + " от " + today,
                                         codes="",
                                         image=f"static/{image}",
                                         video=video)
      print("GOTOVO!")
      return redirect(f"coding/details/{category}/{timecode.pageId}/")
    except Exception as e:
      print(f"Error creating Timecode: {e}")


#@cache_control(no_cache=True, must_revalidate=True)
def td(request, pageId, category):
  if request.method == 'POST':
    #print(request.POST)
    timestamps = request.POST.get('timestamps_field', None).split("\r\n")
    texts = request.POST.get('texts_field', None).split("\r\n")
    timecode = get_object_or_404(Timecode, pk=pageId)
    timecode.codes = ""
    for i in range(len(timestamps)):
      timecode.codes += timestamps[i].strip() + " " + texts[i].strip() + '\n'
    timecode.save()

    title = request.POST.get('title', None)
    print('Received title:', repr(title))
    if title:
      timecode.title = title
      timecode.save()

    # Handle the AJAX request to update timecode.video
    video_id = request.POST.get('video_Id', None)
    #print(video_id)
    if video_id:
      timecode.video = video_id.strip()
      timecode.save()

    return render(
      request, 'td.html', {
        'data': zip(timestamps, texts),
        'length': len(list(zip(timestamps, texts)))
      })
  else:
    timecode = get_object_or_404(Timecode, pk=pageId)
    data = [i for i in Timecode.objects.all() if i.pageId == pageId][0]
    texts = []
    timestamps = []
    if len(data.codes.split("\n")):
      for line in data.codes.split("\n"):
        line = line.strip()
        if line:
          parts = line.split(" ")
          pattern = r'^\d{2}:\d{2}(:\d{2})?$'
          if re.match(pattern, parts[0]):
            timestamps.append(parts[0])
            texts.append(" ".join(parts[1:]))
          else:
            timestamps.append("")
            texts.append(" ".join(parts[0:]))

    return render(
      request, 'td.html', {
        'data': zip(timestamps, texts),
        'length': len(list(zip(timestamps, texts))),
        'link': timecode.video,
        'title': timecode.title
      })


def deleteCode(request, pageId):
  timecode = get_object_or_404(Timecode, pk=pageId)
  timecode.delete()
  return redirect(reverse_lazy('home'))


def getStream(streamDate):
  try:
    videosSearch = VideosSearch('рзврт ' + streamDate, limit=1)
    pre_video = videosSearch.result()
    video = pre_video["result"][0]["id"]
    return video
  except:
    return 'dQw4w9WgXcQ'


def search_api(request):
  search_query = request.GET.get('search_query').lower()
  results = [
    i for i in Timecode.objects.all().order_by('-title')
    if search_query in i.codes.lower()
  ]
  sorted_results = sorted(results, key=lambda x: x.pageId, reverse=True)

  filtered_results = []
  for result in sorted_results:
    lines = result.codes.split('\n')
    for line in lines:
      if search_query in line.lower():
        filtered_results.append({
          'line': line.strip(),
          'category': result.category,
          'pageId': result.pageId,
          'title': result.title,
        })

  context = {'results': filtered_results, 'search_query': search_query}
  return render(request, 'search_results_partial.html', context)


def loginaccount(request):
  if request.method == 'GET':
    form = AuthenticationForm()
    return render(request, 'loginaccount.html', {'form': form})
  else:
    form = AuthenticationForm(request, data=request.POST)
    if form.is_valid():
      user = authenticate(request,
                          username=request.POST['username'],
                          password=request.POST['password'])
      if user is not None:
        login(request, user)
        return redirect('home')
    return render(request, 'loginaccount.html', {
      'form': form,
      'error': 'Не так быстро'
    })


def logoutaccount(request):
  logout(request)
  return redirect('home')
