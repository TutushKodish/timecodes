# Generated by Django 4.2 on 2023-06-11 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timecodes', '0002_timecode_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='timecode',
            name='pageId',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='timecode',
            name='image',
            field=models.ImageField(upload_to='timecodes/static'),
        ),
    ]
