from django.shortcuts import render, redirect
from django.http import HttpResponse
from timecodes.models import Timecode
from .forms import DocumentForm
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_control
from django.urls import reverse_lazy

today = datetime.today().strftime('%Y-%m-%d')

@csrf_exempt
def home(request):
    if request.method == 'GET':
        timecodes = Timecode.objects.all()
        return render(request, 'home.html', {'timecodes': timecodes})
    elif request.method == 'POST':
        category = request.POST['csrfmiddlewaretoken']
        if category == "Утренний":
        	Timecode.objects.create(category=category, date=today, title=category+" от "+today, codes="", image = "static/utro.jpg")
        elif category == "Ночной":
        	Timecode.objects.create(category=category, date=today, title=category+" от "+today, codes="", image = "static/noch.jpg")
        elif category == "В глаза посмотреть":
        	Timecode.objects.create(category=category, date=today, title=category+" от "+today, codes="", image = "static/vgp.jpg")
        else:
        	Timecode.objects.create(category=category, date=today, title=category+" от "+today, codes="", image = "static/drugoe.jpg")
        return redirect(f"coding/{category}/" + str(Timecode.objects.all()[len(Timecode.objects.all())-1].pageId) + "/")

@cache_control(no_cache=True, must_revalidate=True)
def td(request, pageId, category):
    if request.method == 'POST':
        timestamps = request.POST.get('timestamps_field', None).split("\r\n")
        texts = request.POST.get('texts_field', None).split("\r\n")
        timecode = get_object_or_404(Timecode, pk=pageId)
        timecode.codes = ""
        for i in range(len(timestamps)):
            timecode.codes += timestamps[i].strip() + " " + texts[i].strip() + '\n'
        timecode.save()
        return render(request, 'td.html', {'data': zip(timestamps, texts), 'length': len(list(zip(timestamps, texts)))})
    else:
        data = [i for i in Timecode.objects.all() if i.pageId == pageId][0]
        # print(data.codes)
        # print("hguguygug")
        texts = []
        timestamps = []
        if len(data.codes.split("\n")):
            for i in range(len(data.codes.split("\n")) - 1):
                texts.append(" ".join(data.codes.split("\n")[i].split(" ")[1::]))
                timestamps.append(data.codes.split("\n")[i].split(" ")[0])
            # print(list(zip(timestamps, texts)))
            # print(len(list(zip(timestamps, texts))))
            return render(request, 'td.html', {'data': zip(timestamps, texts), 'length': len(list(zip(timestamps, texts)))})
        return render(request, 'td.html', {'data': 0})

def deleteCode(request, pageId):
    timecode = get_object_or_404(Timecode, pk=pageId)
    timecode.delete()
    return redirect(reverse_lazy('home'))

