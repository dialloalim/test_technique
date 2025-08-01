

#Backend
python3 -m venv venv
source venv/bin/activate 

pip install -r requirements.txt
cd prise_rendez_vous
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata data.json
python manage.py runserver

#frontend
npm install
ng serve


