# Generated by Django 4.2.2 on 2023-06-19 23:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gutcheinapp', '0004_userversuche'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userversuche',
            old_name='userid',
            new_name='user',
        ),
    ]
