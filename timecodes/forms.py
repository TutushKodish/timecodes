from django import forms
from .models import Timecode

class DocumentForm(forms.ModelForm):
    class Meta:
        model = Timecode
        fields = ['codes']
        widgets = {
            'codes': forms.Textarea(),
        }

