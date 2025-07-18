#!/bin/bash

# Warna
g='\033[32;1m'
r='\033[31;1m'
y='\033[33;1m'
c='\033[1;36m'
p='\033[35;1m'
n='\033[0m'

# Input dari user
clear 
figlet OWNER |lolcat
echo -e "${p} harus di awali ${c}: ${r}62xxx"
echo -e "${g}"
read -p "Masukkan nomor owner : " owner
echo -e "${c}"
read -p "Masukkan nomor premium : " prem
echo -e "${p}"
read -p "Masukkan nomor add prem : " no
echo ""
cat <<EOF > owner.json
{
  "owner": "${owner}"
}
EOF
cat <<EOF > premium.json
[
  {
    "id": "${prem}@s.whatsapp.net",
    "expired": 1740240049964
  }
]
EOF
echo -e "${r} File owner telah di buat...!!"
echo ""
sleep 3 
clear
echo ""
echo -e "${y} Setting Botz-Bug Dulu...!!"
sleep 4
clear
nano config.js
echo ""
echo -e "${y} Menjalankan Botz-Bug...!!${n}"
echo ""
npm install 
npm start 