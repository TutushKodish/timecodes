# Generated by Django 4.2 on 2023-06-15 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timecodes', '0008_timecode_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='timecode',
            name='video',
            field=models.CharField(default=100, max_length=100),
        ),
    ]