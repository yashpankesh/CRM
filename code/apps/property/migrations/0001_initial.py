# Generated by Django 5.0 on 2025-05-17 11:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('property_type', models.CharField(choices=[('house', 'House'), ('commercial', 'Commercial'), ('land', 'Land')], max_length=20)),
                ('property_sub_type', models.CharField(max_length=50)),
                ('listing_type', models.CharField(choices=[('for_sale', 'For Sale'), ('for_rent', 'For Rent')], default='for_sale', max_length=20)),
                ('status', models.CharField(choices=[('available', 'Available'), ('under_construction', 'Under Construction'), ('coming_soon', 'Coming Soon'), ('sold_out', 'Sold Out')], default='available', max_length=20)),
                ('location', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=14)),
                ('area', models.DecimalField(decimal_places=2, help_text='Total area in sq.ft', max_digits=10)),
                ('carpet_area', models.DecimalField(blank=True, decimal_places=2, help_text='Carpet area in sq.ft', max_digits=10, null=True)),
                ('dimensions_length', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('dimensions_width', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('description', models.TextField()),
                ('floor', models.CharField(blank=True, max_length=50, null=True)),
                ('facing', models.CharField(blank=True, max_length=50, null=True)),
                ('age_of_property', models.CharField(blank=True, max_length=50, null=True)),
                ('balconies', models.CharField(blank=True, max_length=50, null=True)),
                ('furnishing_status', models.CharField(blank=True, max_length=50, null=True)),
                ('possession_status', models.CharField(blank=True, max_length=50, null=True)),
                ('possession_timeline', models.CharField(blank=True, max_length=50, null=True)),
                ('loan_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=14, null=True)),
                ('interest_rate', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('loan_term', models.IntegerField(blank=True, help_text='Loan term in years', null=True)),
                ('contact_name', models.CharField(blank=True, max_length=100, null=True)),
                ('contact_phone', models.CharField(blank=True, max_length=20, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('progress', models.IntegerField(default=0, help_text='Construction progress in percentage')),
                ('units_total', models.IntegerField(default=0)),
                ('units_available', models.IntegerField(default=0)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='properties', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Properties',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PropertyAmenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='amenities', to='property.property')),
            ],
            options={
                'verbose_name_plural': 'Property Amenities',
            },
        ),
        migrations.CreateModel(
            name='PropertyImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='property_images/')),
                ('is_primary', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='property.property')),
            ],
            options={
                'ordering': ['-is_primary', 'created_at'],
            },
        ),
        migrations.CreateModel(
            name='PropertySpecification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=255)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specifications', to='property.property')),
            ],
            options={
                'verbose_name_plural': 'Property Specifications',
            },
        ),
    ]
