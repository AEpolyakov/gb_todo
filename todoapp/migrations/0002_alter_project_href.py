# Generated by Django 3.2.5 on 2021-07-20 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='href',
            field=models.URLField(blank=True, max_length=128),
        ),
    ]
