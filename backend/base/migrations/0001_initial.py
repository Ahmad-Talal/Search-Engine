# Generated by Django 4.0.4 on 2022-05-05 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cookie',
            fields=[
                ('nothing', models.CharField(blank=True, max_length=25, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Search',
            fields=[
                ('search', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('cookie', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.cookie')),
            ],
        ),
    ]