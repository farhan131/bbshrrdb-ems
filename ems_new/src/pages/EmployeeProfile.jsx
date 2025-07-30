import React, { useState, useEffect } from 'react';
import Header from './Header'; // Assuming Header component is in the same directory or a common 'components' directory

// Data extracted from the PDF for Districts, Talukas, and Dehs (UCs)
const locationData = {
  "Badin": {
    "Badin": ["Abri", "Achh", "Achhro", "Akro", "Aminariro", "Andhalo", "Angri", "Babralo-under sea", "Badin", "Baghar", "Bagreji", "Bakho Khudi", "Bandho", "Bano", "Behdmi", "Bhambhki", "Bhaneri", "Bidhadi", "Bijoriro", "Bokhi", "Booharki", "Borandi", "Buxa", "Chandhadi", "Chanesri", "Charo", "Cheerandi", "Chhel", "Chobandi", "Chorhadi", "Chorhalo", "Daleji", "Dandhi", "Daphri", "Dasti", "Dhandh", "Dharan", "Dheenghar", "Doonghadi", "Gabarlo", "Gad", "Gagro", "Ghurbi", "Githo", "Gujjo", "Gurho", "Jakhralo", "Jakhri", "janath", "Janjhli", "Janki", "Jhagri", "Jhalar", "Jhol khasi", "Jhurkandi", "Kadhan", "Kadi kazia", "Kahlifa", "Kak", "Kalhori", "Kamaro", "Kand", "Kandri", "Karabhari", "Keerandi", "Khakhar", "Khalso", "Khambro", "Kheerdahi", "Khudi", "Khurhadi", "Khuro", "Kumbhariro", "Kunar", "Lohan", "Lao", "Lareri", "Loon Khan", "Luari Sharif", "Lundo", "Majja Basri", "Makhandi", "Makra", "Malki", "Marai", "Mard", "Markhan", "Mirzapur", "Mithi", "Mithi-2", "Mithi-3", "More", "Moreri", "Morhadi", "Moro", "Nangarkhet", "Nangro", "Nareri", "Nindo Shaher", "Odha", "Ojhri", "Padhar", "Pado", "Pahori", "Pakhothar", "Palh", "Panchi", "Panhwarki", "Pano", "Pano Baeed", "Pano Baqir", "Pano Lundki", "Pano Mir Khan", "Patar", "Pateji", "Patiari", "Qaimpur", "Rat", "Roonghadi", "Sando", "Sanghar", "Sanjra", "Sarahadi", "Saroro", "Seerani", "Senghari", "Setha", "Sheikhpur", "Sialki", "Siantri", "Siarsi", "Sonhar", "Sutiari", "Tali", "Thath", "Vidhri", "Wagodaho", "Wahryaro", "Waldhari", "Wararki", "Waryaro", "Waryaso"],
    "Matli": ["Aghamano", "Ali pur", "Amarlo", "Arain", "Bambhnai", "Baran", "Barasar", "Bediro", "Bhadari", "Buhro Jagir", "Buhro Rayati", "Chakra", "Chan Ganga", "Chansonrani", "Chan-sorahadi", "Chaogazo", "Choretani", "Dasti", "Dadhar", "Dakaro", "Dariri", "Daro sendi", "Deero muhabat", "Dembyari", "Dhabhi", "Dilo-dero", "Diyal", "Doomani", "Dumbalo", "Gari Bhri", "Ghari Lundi", "Gharo", "Gharo Sarmast", "Gopalo", "Gorano", "Gujo", "H.karam ali", "Hanjar", "Jarki", "Jehajani", "Juneja", "Kalwari", "Kandrahki", "Kangni", "Kanheri", "Kari Muhammad Ali", "Kari sain Dad", "Kariyano", "Kathore", "Keenjhar", "Khaberlo", "Khachar", "Khad Khuhi", "Khairwah", "Khareri", "Khari", "Khariyon", "Khathore", "Khori", "Khudi", "Labni", "Lakhadi", "Lanyari", "Lorer", "Lundano", "Maban", "Malhan", "Mangria", "Matli", "More", "Morhadi", "Nathu", "Pabni", "Padhar", "Paee", "Paniro", "Panjm Hisso", "Phulejani", "Rain", "Rohiro", "Sando", "Saonro", "Sehrat", "Senhor", "Sikni", "Sita", "Sore", "Sorhadi", "Sun", "T.G Ali", "Talho", "Talhyari", "Tali", "Thari", "Udhejani", "Vee", "Waghrayi", "Wanji"],
    "S.F.Rahu": ["Agri", "Ahmed rajo-1", "Ahmed rajo-2", "Ahmed rajo-3", "Ahmed rajo-4", "Ahmed rajo-5", "Ahmed rajo-6", "Akai", "Akri Jagir", "Akri-1", "Akri-2", "Aseli", "Bari", "Barodari", "Bukerani", "Cahkari", "Chachh", "Dadharko", "Dandho", "Dasarki", "Dubi", "Fatehpur", "Ghanwarah", "Gharo", "Girhari-1", "Girhari-2", "Girhari-3", "Girhari-4", "Girhari-5", "Githo", "Golarchi", "Gujhari", "Jakheji-1&2", "Jhabiro", "Jhol", "Jhol-2", "Jhole-1", "Jhole-3", "Jhole-4", "Jhole-5", "Jhole-6", "Kadh", "Kaheki", "Kakejani", "Kand", "Kandeyari", "Kario-1,2", "Kathar", "Kharch", "Khareyoon", "kharoDabo", "Khebrani", "Kheeryoon", "Khero Bhataro", "khersari", "Khorwah", "Khudh", "Kinder Jageer", "Koryani", "lakhi", "Lakri", "lashkarnani", "Lorhad", "Malira", "Mariwasayo 2", "Mariwasayo-1", "Maroo jat", "Minyoon", "Mitho Dabo", "Miyano Karrath", "Mukhdoompur", "Mulki", "Narri", "Narbut", "Nohiki", "Nukarji-1", "Nuqarji-2", "Odherki", "Padheryoon", "Patihal", "Phitoon", "Rahuki", "Rari-1", "Rari-2", "Rari-3", "Rari-4", "Rari-5", "Rip", "Saleh abad", "Samki", "Shekhano", "Sodhki", "Sorhadi", "Suteyari", "Tajhedi", "Tarai", "Walhar"],
    "Talhar": ["Bagerki", "Baghlani", "Bhetaro", "Bohrro I", "Bohrro II", "Bohrro III", "Bohrro IV", "Chachari", "Channeri", "Chick", "Dabgro", "Dabhrro", "Dato Jamali", "Daurung", "Dedki", "Doro Nero", "Dourmano", "Gaheki", "Golarri", "Gonho", "Kanderi", "Khanoat", "Kocho Sajan Sawai", "Kohar", "Koteri", "Lundki", "More", "Morjhar", "Mughal Hafiz", "Munahaiki", "Nar", "Nawabed", "Paathroon", "Perharki", "Phosana", "Phulhadion", "Raheji", "Rembhan", "Rip", "Rojherlei", "Saeed Pur", "Sajan", "Sajan pur", "Sandhki", "Sausi", "Seri", "Shakani", "Shorki", "Talhar", "Vassarki", "Vidh", "Walhar", "Wasi Adil", "Wasi Sajjan"],
    "Tando Bago": ["Adori", "Ahmedani", "Akore", "Ali abad", "Amar Nar", "Aqil", "Bagh Shahmir", "Banghar", "Baxo Kaloi", "Beero Weran", "Belaro", "Bhryoon", "Bohri", "Chandheli-1", "Chandheli-11", "Chandheli-111", "Changho", "Char", "Charvo", "Chavra", "Chhabralo", "Chhachh", "Chhan", "Choubandi", "Dadah", "Dambharlo", "Dando", "Dei", "Dei jarkas", "Dhanjol", "Dhoro Kaka Noro", "Dhubni", "Digh", "Domhar", "Duz", "Fateh Pur", "Fato Qambrani", "Gad", "Gaheji", "Girathri", "Gujo", "Hajar Hadi", "Hameera", "Har", "Higorjani", "Hothair", "Jal Mori", "Jesar", "Kahdharo", "Kak-1", "Kak-11", "Kak-111", "Kamaro", "Kang", "Kangpir", "Kapoori", "Kariyano", "Katadaho", "Katal", "Khadi Adat", "Khado", "Khahi Beero", "Khairpur", "Khalso", "Khanah", "Khari Khabarlo", "Kheerdahi", "Kherol", "Khoro", "Khoski", "Khureri", "Korahi", "Liar", "Machandi", "Machori", "Mato", "Mena", "Mesadi", "Mohna", "Morahadi", "Moro", "Motna", "Oil Pur", "Panu Nau", "Pharho", "Phull", "Phyari", "Pir Misri", "Piror", "Potho", "Potho Nar", "Rail Tarai", "Rajori-1", "Rajori-111", "Ropari", "Saddiq", "Sangi", "Senhaho", "Sonhar", "Sonhari", "Tando Bago", "Tayab Sehto", "Thorki", "Thorlo", "Thui", "Tori", "Toryano", "Uanrki", "Vee Bahadur", "Waghdahi"]
  },
  "Dadu": {
    "Dadu": ["Aminiani", "Badani", "Baghban", "Bakhrani", "Belo Choi", "Bhand", "Buth Malho", "Buthi", "Chanrath Jagir", "Chanrath Rayaeti", "Choi", "Dadu", "Dawichh", "Dhoro Damrio", "Duabo", "Dubi jagir", "Dubi Rayeti", "Ghallo", "Jakhpari", "Juberji", "Jung", "Kalhora", "Kandi", "Katcho Chanrath", "Katcho Kharero", "Katcho Nasrani", "Katcho Pumbi", "Katcho Purano Dero", "Katcho Rap", "Katcho Sita", "Keenjhar", "Khariro", "Khasa chandia", "Khero", "Khudabad Jagir", "Khudabad Rayaeti", "Khushik", "Koorpur", "Makhdoom Sahib", "Malkani", "Markhpur", "Marvi", "Moundar", "Nasrani", "Naulakho", "Noorja", "Pacco Sita", "Palha", "Pat", "Phaka", "Piperpanjan", "Pipri", "Pir gunio", "Pir Tarho Jagir", "Pir Tarho Rayeti", "Pumbi", "Purano Dero", "Rap", "Samheen", "Shahani", "Sial", "Sidhwah", "Sonnhion jagir", "Soonhion Rayeti", "Sutcharo", "Taga", "Warayaso"],
    "Johi": ["Abad", "Allah Yar Dero", "Angi", "Aroni", "Arraro", "Baghari", "Bahwalpur", "Bakhar Shaheed", "Beer Bughio", "Bhashim Faqeer", "Bhlali Shah", "Bueer", "Buthi", "Chakar Kot", "Channa", "Chinni", "Cookrani", "Dabhari", "Dara Machhi", "Daubo", "Dhonk", "Din Panah", "Dohari Kunari", "Drigh Bala", "Drigh Henthi", "Fhero Dero", "Gahi Charo", "Gaji Khan", "Ghaha", "Gorandi", "Hairo Khan", "Haji Khan", "Hali Jo", "Hassnani", "Jalab", "Jampur Landki", "Jampur Panwarki", "Jhalko", "Johi", "Kathya Barani", "Keti Nai", "Khan Wah", "Khandhani", "Kharach", "Khat", "Khooh Mano", "Koor Kalan", "Koor Phajo", "Koorja Mikk", "Kot Bajo", "Lalhar", "Landho Dero", "Lohri", "Machoko", "Main-Ji-Kandi", "Makhan Belo", "Malhar Barani", "Malko Jagir", "Masoo Dero", "Mir Wah", "Mirani Mchhi", "Mothri", "Mureed Dero", "Nai Taki", "Naichki", "Nali", "Naushahro", "Noonari", "Nooro", "Pahore", "Pai", "Pat Gul Mohammad", "Pat Khanhari", "Pat Suleman-1", "Pat Suleman-2", "Pat Suleman-3", "Pat Suleman-4", "Patro-1", "Patro-2", "Patro-3", "Peer Dohari", "Phadak", "Phulji jagir", "Phulji Rati", "Pir Gaji shah", "Potho", "Qasbo", "Qubo Qalandar-1", "Qubo Qalandar-2", "Rajo Dero", "Sakaro", "Sakir Hali Jo", "Saranjhari", "Sawaro", "Shah Hassan", "Shahdman", "Shahmorio", "Shori Jagir", "Sole Jagir", "Suk Nai", "Thariri Jado Shaheed", "Thull", "Tok Qasim", "Tore", "Tori", "Tori-1", "Tori-2", "Vigji Jgir", "Vigji Rati", "Wahi Pandhi"],
    "Khairpur Nathan Shah": ["Abad Jagir", "Ahori Jagir", "Ahori Rayati", "Akhir Nari", "Bahadurpur", "Baid", "Baledera Jagir", "Baledera Rayati", "Banbhinyoon", "Bawan", "Bego dero", "Bhagna", "Bhangar", "Bori no.1", "Bori no.2", "Borriri", "Bugg", "Burrira Jagir", "Burrira Rayati", "Buttra", "Chhandan", "Chija pur Jagir", "Chija pur rayati", "Chow Khandi", "Dangar", "Dhingano", "Dogar", "Drib Toolan", "Dur mohammad", "Fateh Pur", "Fekhirato", "Gabariji", "Gachal", "Gadhi", "Gharo", "Ghija pur Jagir", "Ghija pur rayati", "Gozo", "Isso Machi", "Isso Narejo jagir", "Isso narejo Rayati", "Jakhiro", "Kakar", "Kande chukhi", "Kario Ghulam-ullah", "Kario Mitho Zangejo Jagir", "Kario Mitho Zangejo Rayati", "Khadhar", "Khairpur Jagir", "Khanbhan Nangin", "Khanpur", "Khariro kinaro", "Khat Lashikar", "Khathri", "Khurbi No.1", "Khurbi No.2", "Kooh Misri", "Koor budho", "Koor Hussain", "Kurkut Jagir", "Kurkut rayati", "Ladho Dero", "Mado Jagir", "Mado Rayati", "Maha", "Makhi Servey", "Makhi Unsurvey", "Malam No.1", "Malam No.2", "Mari", "Mir Mohammad", "Miro Kalhoro", "Pai", "Pai jaho", "Pusia", "Qamber Jagir", "Qamber Rayati", "Qomicharo", "Rahuja", "Rap", "Rap Kainchi", "Redhi Servey", "Redhi Unservey", "Salari No.1", "Salari No.2", "Salari No.3", "Salari No.4", "Salari No.5", "Seer Abad", "Sheeh werho", "Sukhapur", "Thalho", "Vaiji", "Wasai"],
    "Mehar": ["Abad-1", "Abad-11", "Anbar", "Bachi Jagir", "Bachi Rayeti", "Baledai", "Balko", "Band Gahi", "Belo Bhorti", "Belo Sona Bindi", "Betto", "Bhand Mari", "Bhorti-11", "Bhutto", "Bisharat katchri", "Bothro", "Butt Serai", "Charo", "Chhalo", "Dadh Barani", "Dadhar", "Dakhani", "Durbo", "Faridabad", "Faridabad Barani", "Gahi Maheasr", "Ganja Thorha", "Garkan", "Ghari Jageer", "Ghari rayeti", "Goongo", "Gul Mohd Wah", "Gunhero", "Humbar", "Kamalpur", "Kamangar", "Kandhra", "Kario Qasim Shah", "Kaseero", "Kawanjhro", "Keriro", "Khondi", "Kinaro Kakol", "Kolachi", "Kothi Khokhar", "Kothi Sodhari", "Kundan", "Lakhyari", "Laloo Ghari", "Langhano", "Litan", "Magsi", "Mangwani", "Manjan", "Mojhar Barani", "Mureed Lakhiar", "Nari", "Nasoi", "Nath", "Naun Goth", "Neerah", "Pat Kandi", "Pateji", "Peroz Shah", "Pipri", "Poarcho", "Radhan", "Rap Nari", "Reo Katcho", "Rojhan", "Roni", "Sadhar Aliwal", "Saeedpur", "Seri", "Shah Panjo", "Thariri Muhabat", "Umedero", "Ustelo", "Wah Gahi", "Waryaso"]
  },
  "Ghotki": {
    "Ghotki": ["Adilpur", "Amirabad", "Attal Muradani", "Bago Daho", "Bandh", "Baqro", "Behishti", "Belo Gublo", "Belo Jamshero", "Belo Sangri", "Beriri", "Bhanjro", "Bhiryalo", "Bhityoon", "Changlani", "Dari", "Dhamaji", "Doomano", "Drago", "Dring Chachhar", "Erazi", "Esa Wali", "Fazal Bhayo", "Hakra", "Hamro", "Hussain Beli", "Jahanpur", "Jamal", "Janghiari", "Katcho Bahab", "Katcho Bindi", "Katcho Miranpur", "Katcho Tibi", "Katco Buxo Ghoto", "Khadwari", "Khahi Daro", "Kham", "Khuhara", "Kotlo Bullo", "Labana", "Lakhan", "Laloowali", "Maka", "Malhir", "Malook Wali", "Mathelo", "Miyani", "Moto Mahar", "Muhammad Pur", "Odharwali", "Pacco Bahab", "Pacco Bindi", "Pacco Buxo Ghoto", "Pacco Miranpur", "Pacco Tibi", "Pano Khalso", "Phekrato", "Qadirpur", "Qaloo Malhan", "Qazi Wahan", "Ruk", "Saleh Mahar", "Sangi Ghotki", "Sangri", "Sarhad", "Satabo Bhayo", "Shafiabad", "Shaikhani", "Suhriani", "Sundrani", "Thatho Malhan", "Vidhur", "Wad Pagiya", "Wagni", "Wasayo Chachar", "Wasti Inayat Shah", "Wasti Q.Din Shah"],
    "Daharki": ["Alamarain", "Bago Daro", "Belo Berutta", "Berutta", "Chacharki", "Chanad", "Chhoranwalo", "Daharki", "Derawaro", "Dhandh Raharki", "Goi", "Gorhelo", "Gulo Pitafi", "Hamidpur", "Hiko", "Ibrahim Pitafi", "Jado Pitafi", "Jampur", "Jhanwar", "Jhum", "Jung", "Kalwar", "Katta", "Khenjho", "Kherohi", "Khushkh", "Kotlo", "Lal Pitafi", "Looni", "Maringaro", "Mirzapur", "Poh No1", "Poh No2", "Raharki", "Rail", "Raini", "Sain Dino Malik", "Sanilo", "Sanko", "Sejan", "Shahbazpur", "Simno", "Sutiayaro No5", "Sutiyaro Chak No1", "Sutiyaro Chak No2", "Takio M.Pannah", "Vijnoth", "Wahi Gul Khan"],
    "Khan Garh": ["Aithi", "Ali Mahar", "Ari Mahar", "Bambli", "Bandwari", "Bari", "Bhetoor", "Bhitoin", "Chak Qazi Badal", "Chhanwani", "Dakhano", "Ibrahim Mahar", "Izat Wari", "Kandlo", "Khabar Chachar", "Khangarh", "Khanpur", "Lakho Mahar", "Lohi", "Makahi", "Mithri", "Naro", "Pathan Mahar", "Phul Daho", "Qazi Badal", "Raanyar", "Sahta", "Samo Wah", "Sanharo", "Shahpur", "Sutiaro No:1", "Sutiaro No:3", "Tarai", "Wahi Dhano", "Waloo Mahar", "Walrah", "Warwaro"],
    "Mirpur Matelo": ["Akhtiar Waseer", "Alim Khan Gadani", "Baloch Khan", "Barar", "Bel Mirpur", "Bel0 Waseer", "Belo Bozdar", "Bhiri Laghari", "Chijjan", "Damanon", "Darwesh Naich", "Dhangro", "Dil Muard Gabole", "Dino Mako", "Drib Dethri", "Fatehpur", "Gahno lund", "Gaji Gadani", "Garhi Chakar", "Gendaro", "Gurkan", "Haj Korai", "Hamind Korai", "Hayat Pitafi", "Ismail Bozdar", "Jahan Khan Unar", "Jarwar", "Jhangan", "Jindo Pitafi", "Kander", "Karampur", "Khansar", "Khu Meenhon", "Khui Khengi", "Lashkri Lund", "Latif Shah", "Machalo", "Malnas", "Meroja", "Mirpur", "Mitho Lund", "Nhundri", "Pipri", "Sabar Bozdar", "Saeed Khan Chandio", "Sahib Khan Lund", "Shekhan Wari", "Sher Ali Gabole", "Sher Khan Bozdar", "Sher Khan Kolachi", "Sobho Lund", "Sono Pitafi", "Suhanjro", "Sutyaro 1", "Sutyaro 4", "Tahir Gadani", "Wah Bakro", "Wahi Ghoto", "Wahi Mubarak", "Yaro Lund"],
    "Ubauro": ["B.Rano Rahar", "Band", "Bapar", "Belo Rawanti", "Bindi adam", "Bindo A.Sattar", "Bori", "Chanali", "Chandia", "Chatu Daho", "Dabli", "Daulatpur", "Daveri", "Detha Bhaya", "Dilwaro", "Dub", "Garang", "Ghundi", "Girkno", "Gohram chachar", "Goongo daho", "Islam Lashari", "Jhangal Dawo", "Jhangal malik", "Kalwli", "Kamo Shaheed", "Katcho miani malook", "Keenjhar", "Khambhra", "Khamiso Chachar", "Koraiki", "Kotlo kamil", "Kotlo Yousuf", "Kubhur", "Kundri Walo", "Langho", "Larh nabo", "Likhpur", "Lundo", "Madan Walo", "Mari", "Maroowalo", "Matar Kot", "Muhammad Pur", "Muradpur", "Naseer dhandu", "Nurley", "Pako miani malook", "Pir Bux", "Rajanpur", "Rano Rahar", "Rawanti", "Reti", "Rind", "Sayed Pur", "Shadi walo", "Shahwali", "Shams chapri", "Shewani", "Soi Sharef", "Sonan", "Tig", "Ubauro", "W.J Shah", "Warwalo"]
  },
  "Hyderabad": {
    "Hyderabad": ["Abri", "Agheemani", "Almani", "Alni", "Amilpur", "Barechani", "Barham", "Bhido Jagar", "Bhindo Rayati", "Bhinpur", "Bilori", "Bohiki", "Boochki Jagir", "Boochki Rayati", "Buxo laghari", "Chacha Detha", "Chukhi", "Dachrapur", "Dali Nandi", "Dali Wadi", "Damanchani Rayati", "Dhamanchani Jagir", "Ghaliyoon", "Ghotana", "Gujjan", "Gul Mohd Thoro", "Halepota", "Hatri", "Hotki", "Hussain Khan Thoro", "Kajhur", "Kathri", "Kathro", "Khanpota", "Khunjejani", "Kunner", "Lashari", "Liyar Jagir", "Mati", "Miyano", "Moharo", "Moolan", "Mori Jagir", "Mori Rayati", "Mulki", "Narejani", "Noorai Jagir", "Noorai Rayati", "Panhwari", "Pasaikhi", "Patbhari", "Patoro", "Raees", "Rahooki", "Rajpari", "Rukanpur", "Sahita", "Sanhwar", "Seri Jagir", "Seri Rayati", "Sipki Jagir", "Sipki Rayati", "Sukhpur", "Takio Jeewan Shah Jagir", "Takio Jeewan Shah Rayati", "Tando Fazal", "Tando Qaiser", "Thaheem", "Theba", "Widh"],
    "Qasimabad": ["Jamshoro", "Mirzapur", "Sari", "Shah Bukhari"],
    "Latifabad": ["Bora reyati", "Ganjo Takar", "Giddu Bandar", "Goondar", "Khater", "Lakhi Keti", "Malh", "Mehrani", "Met Khan", "Nareja"],
    "Hyderabad City": ["Foujgah", "Ghanghra", "Gujjo", "Hyderabad"]
  },
  "Jacobabad": {
    "Jacobabad": ["Abad", "Abdullah Dakhan", "Ahmedpur", "Akilpur", "Alipur", "Attai", "Bachal Pur", "Badal Wah", "Bajhani", "Baqapur", "Bello Alipur", "Bello Dixon", "Bhalidino", "Burj Selemi", "Chajjra", "Chawani", "Dadh", "Dadpur", "Dasti", "Detha", "Dilawarpur", "Fatehpur", "Garhi Chand", "Garhi Mehrab", "Ghouspur", "Hambhi", "Jacobabad", "Janidero", "Khairwah", "Khaloolabad", "Koureja", "Lal Lodro", "Malhooabad", "Mehar Shah", "Mehrabpur", "Milkiat Sarkar", "Moulabad", "Moulan Rato", "Mundranipur", "Nawara", "Nawazo", "Orangabad", "Phatanwah", "Pir Padhro", "Qadirpur", "Qaiasrabad", "Rahimabad", "Ramzanpur", "Retti", "Rindwahi", "Shahdadpur", "Shahpur", "Sheeradabad", "Soomanpur", "Thariri Bhalidino", "Umaranipur", "Wakro", "Waryamabad"],
    "Thul": ["Abdullah Jakhrani", "Ali Khan", "Allagh Yar", "Athri", "Bachro", "Bahadurpur", "Bakhtiarpur", "Balochabad", "Bamble", "Barri", "Bhanger", "Bitti", "Bolaki", "Burira", "Chandan", "Channa", "Daho", "Dakhan", "Daro Mukh", "Deen Garh", "Dhani Bux", "Dil Murad", "Dool", "Dubi", "Fateh Khan Sabayo", "Ganji", "Garhi Hassan", "Garhi Rahimabad", "Ghulamoon", "Ghunia", "Girkano", "Gola", "Gujo", "Hairo", "Hambi", "Hotewah", "Hyderpur", "Jalal Pur", "Jariyoon", "Jhangiwah", "Joungal", "Kanrani", "Karim Abad", "Karim Bux", "Katta", "Khatan", "Khosa", "Khuda Bux", "Korar", "Kot Gul Muhammad", "Kot Jangu", "Lado", "Logi", "Loi", "Madad Khoso", "Maloi", "Mehar Ali", "Mehrabpur", "Miral Nau", "Miral Purano", "Mirpur", "Mirsipur", "Mitho Thariri", "Moosa Wah", "Mubarak Pur", "Muhib Wah", "Nagan", "Nau Wah", "Odhano", "Pako", "Panah Abaad", "Phul", "Purano Wah", "Qalendarpur", "Rahim Abad", "Ranjhapur", "Rap Muard", "Rato Thariri", "Sajin Wah", "Sameja", "Sarki", "Sher Wah", "Shujra", "Tajo Khoso", "Talib Shah", "Tanwari", "Thariri", "Thul Nau", "Thul Purano", "Toj", "Udi", "Wah Mistri", "Zangipur"],
    "Garhi Khairo": ["Abdullah Mahesar", "Allah Pur", "Allahabad", "Amir Abad", "Azmat Abad", "Baharo Khokhar", "Budho", "Daro Jeeand", "Datirdino Mahesar", "Dital Wah", "Doda Pur", "Drib Morayo", "Dunya Pur`", "Garhi Khairo", "Ghouse Abad", "Gokal Pur", "Gul Wah", "Hazar WAH", "Jafar Abad", "Jahan Pur", "Jalbani", "Jamal Abad", "Jeeand", "Khairo", "Khan Wah", "Khand", "Khanpur", "Khuda Abad", "Kitch", "Kohari", "Koor Beero", "Koor Khairo Gachal", "Koor Rato", "Kotari", "Kote Ali Nawaz", "Lal Odho", "Lal Wah", "Lund", "Mairee", "Miranpur", "Muarad Ali", "Muhammad Pur", "Nao Wah", "Nazimabad", "Pir Bux", "Punhoon Bhatti", "Qeemat Abad", "Rasol Abad", "Saleh", "Sawan Lashari", "Shah Bazi Mahar", "Shaheed", "Sher Khan", "Sheran Pur", "Sone Wah", "Sultanpur", "Tajo Dero", "Thariri", "Wah Ali Hyder", "Wasayo"]
  },
  "Jamshoro": {
    "Kotri": ["Andhi-Je-Kasi", "Bada Jaghir", "Bada Rayati", "Belo Gugh", "Chhib", "Dabhon", "Kandh Wingo", "Karo-Khoho", "Khanpur", "Kotri", "Manjho Jagir", "Manjho Rayti", "Morho Jabal", "Mulas", "Nadhi Buhni", "Petaro Jagir", "Petaro Rayati", "Rahir", "Railo", "Saloi", "Sonwalhar", "Tango", "Tarband", "Ukhri Kass", "Vee", "Wagan Wari"],
    "Manjhand": ["Abad", "Amri", "Badhpur", "Belo Unerpur", "Bhacha", "Bhadar", "Bhambhara", "Bhiyan", "Bhorawah", "Bug", "Butho", "Chachhar", "Dabhi", "Dabhri", "Dumb", "Elchi", "Gaincha", "Givari", "Gor Had", "Jhalo", "Kachi", "Kandher", "Karahi", "Kastor", "Khakoor", "Khasai", "Kheraji", "Khuman", "Korejani", "Kubi", "Kun", "Lakha", "Lakhri", "Laki", "Lellan", "Manjhand", "Meeting", "Nea Jetharo", "Noorpur", "Ocho", "Rajri", "Rio Katcho Unerpur", "Sann", "Shoorki", "Tangyani", "Thatti", "Thebat", "Unerpur", "Wachharo", "Wadi Behani"],
    "Sehwan": ["Abad", "Akri Jageer", "Akri Rayati", "Aktar", "Arazi", "Arbi", "Bado Jabal", "Bagh Yousif", "Baid", "Bajara", "Barki", "Bhambha", "Bhan", "Bhootra", "Bhundhri", "Bilawalpur", "Bilhan", "Bilhni", "Bubuk", "Bukhtiar Pur", "Channa", "Chhachh", "Chorlo", "Dal", "Dalh", "Dhandh-Karampur", "Duri Dero Jageer", "Duri Dero Rayati", "Fazlani", "Gahir", "Gumrachh", "Jafferabad", "Jaheja", "Jatoi", "Jhandiani", "Jhangara", "Kachhi", "Kai", "Kalo Bhori", "Kandi Jabal", "Karampur", "Karyani", "Khabroth Jageer", "Khabroth Rayati", "Khero Dero", "Kot Barocho", "Lashari", "Maheji", "Miliriri", "Munh-Mukhri", "Naing", "Narpirari", "Nighawal", "Peer Hassan", "Radhok", "Rohri", "Saeedabad", "Sehwan", "Shah Gorch", "Shaikh", "Sultanpur", "Super", "Talabad Jabal", "Talti", "Tando Shahbazi", "Tehni", "Therhi Jageer", "Therhi Rayati", "Wahur", "Wanchha", "Yakubani"],
    "Thano Bula Khan": ["Babar Band", "Bachani", "Batharo-Karchat", "Beli Thap", "Bhall", "Desvi", "Dhamach", "Ghanghiaro", "Hathal Buth", "Kalo Khohar", "Kande-Tarai", "Kapat", "Khajoor", "Koh-Tarash", "Loyachh-Doda Khan", "Loyachh-Sardar Khan", "Mole", "Pat-Karchat", "Pokhan", "Rani Kot", "Rek", "Sari", "Tak Makan", "Thando Arab Khan", "Tiko Baran", "Toung", "Uth Palan", "Wahi Arab khan"]
  },
  "Kamber Shahdadkot": {
    "Kamber": ["Abri", "Acha", "Aheer", "Bagh Jagir", "Bagodero", "Ber", "Bhada", "Bhangar Acha", "Bharmi", "Bhola Kalhora", "Boohar", "Chacha", "Chajjra", "Changro", "Dera", "Dhero", "Dost Ali", "Drib Mitho", "Duwabo", "Elchi", "Esso", "F.M Siyal", "Fatoohal Wah", "Ghathar", "Ghogharo", "Hani", "Hasula", "Hulia", "Jagir No 3", "Jagir No.6 Chak No. 10", "Jagir No.6 Chak No. 11", "Jagir No.6 Chak No. 12", "Jagir No.6 Chak No. 13", "Jagir No.6 Chak No. 14", "Jagir No.6 Chak No. 15", "Jagir No.6 Chak No. 16", "Jagir No.6 Chak No. 17", "Jagir No.6 Chak No. 18", "Jagir No.6 Chak No. 19", "Jagir No.6 Chak No. 2", "Jagir No.6 Chak No. 20", "Jagir No.6 Chak No. 21", "Jagir No.6 Chak No. 22", "Jagir No.6 Chak No. 23", "Jagir No.6 Chak No. 24", "Jagir No.6 Chak No. 25", "Jagir No.6 Chak No. 26", "Jagir No.6 Chak No. 27", "Jagir No.6 Chak No. 28", "Jagir No.6 Chak No. 29", "Jagir No.6 Chak No. 3", "Jagir No.6 Chak No. 30", "Jagir No.6 Chak No. 31", "Jagir No.6 Chak No. 32", "Jagir No.6 Chak No. 33", "Jagir No.6 Chak No. 34", "Jagir No.6 Chak No. 35", "Jagir No.6 Chak No. 36", "Jagir No.6 Chak No. 37", "Jagir No.6 Chak No. 4", "Jagir No.6 Chak No. 5", "Jagir No.6 Chak No. 6", "Jagir No.6 Chak No. 7", "Jagir No.6 Chak No. 8", "Jagir No.6 Chak No. 9", "Jagir No1", "Jagir NO2", "Jagir No-4", "Jagir No-5", "Jagir No6", "Jian Abro", "Juneja", "Kalar", "Kamal Khan", "Kamber", "Kanwar`", "Kario Murad Ali", "Karohar", "Khabiriro", "Khahi Meehoon", "Khairpur Jusso", "Kohistan", "Koor Hassan", "Koor Kamal", "Koor Suleman", "Lakha", "Lakhtiya", "Lashkari Chandio", "Mahyoon", "Mena", "Mohabat Buledi", "Nangar Hakro", "Nathar", "Nouzman", "Pakho", "Panhwaro", "Peroz Bhatti", "Potho Ibrahim", "Puna", "Ranwati", "Rato Kot", "Sharifani", "Wadha", "Wakro", "Waryaso"],
    "Miro Khan": ["Ali sher Gopang", "Allah Bad", "Allah bux wadho", "Allah Rakhio", "Behram Hethyoon", "Behram Mathyon", "Bharmi", "Buthi", "Cheelo", "Chhajri", "Chori", "Chutto joyo", "Dhori Mubarak", "Dhori pir bux", "Dingri", "Drib chandio", "Golo Khuhawar", "Jalal", "Kalhora", "Kallar daro Muqam", "Karam ali gopang", "Karera", "Kario Jam", "Khudi", "Koor ali khan", "Koor Ibarahim", "Koor Ismail", "Koor Muhbbat", "Mahmoon", "Misri khan Chandio", "Pholro", "Qaim gopang", "Rap", "Shah Ali Tunio", "Thareri Dhap", "Tharo wadho", "Thull", "Vee"],
    "Nasirabad": ["Adi Dhamrah", "Adi Lashari", "Ali Bahar", "Buth", "Buth dera", "Chinjni", "Chodero", "Dera", "Dhamrah", "Fekhrato", "Guko", "Gul Sangar", "Jalbani", "Kathia Bazar", "Khadhari", "Laiquepur", "Lakha", "Mangio", "Muradi", "Nasirabad", "Thariri Hashim", "Wahucha", "Wasu Kalhoro"],
    "Qubo Saeed Khan": ["Bagodaro", "Bellati", "Dhoori", "Dur Mohammad", "Gada", "Hakra", "Hazarwah", "Imam Bux", "Ishaque", "Jagir", "Jamali", "Kamil", "Khokhar", "khuhawar", "Kohistan", "Kot Shahbag", "Machi", "Mast ali", "Mohammad Hassan", "Mugheri", "Pat No 1", "Pat No2", "Pathuja", "Phalai", "Pir bux", "Qubo Saeed khan", "Sadique", "Samander", "Sarhad", "Seer Chandia", "Seer dakhan", "Seer Jamali", "Seer Magsi", "Seer Setlement", "Shah Waryaso", "Trangra", "Waryal", "Zar"],
    "Shahdadot": ["Bhatti", "Bhurgeri`", "Bhutta", "Chandia", "Choudha", "Dakhan", "Dhing", "Gahanwar", "Gopang", "Gurgaj", "Hameer", "Idden Jarwar", "Jari", "Jatoi", "Jhurir", "Juneja", "Kalar", "Kalhora", "Kario Ahmed Khan", "Kario Sobdar", "Khosa", "Koor Kari", "Kot Karira", "Kot Nabi Bux", "Leghari", "Magsi", "Markhand", "Meena", "Miro Khan", "Noor Pur", "Qutria`", "Sando", "Sanjar Bhatti", "Seelra", "Shahdadot", "Shaho Jamali", "Siyal", "Sukkur Jarwar"],
    "Sijawal Junejo": ["Aalam Khan Junejo", "Arzi Bhutto", "Bakhsho Sario", "Belharo", "Chakar Suleman", "Chango", "Dhingano Mahesar", "Fateh Khan Dhamraho", "Fatuhal Chodo", "Ghulam,Muhammad Leghari", "Gul Kalhoro", "Gul Shah", "Hayat Gopang", "Hyder Chandio", "Hyder Detho", "Jaleel Kalhoro", "Jiand Laak", "Kallar", "Kandi", "Kario Wah", "Khaliq Dino Dakhan", "Koor Sahab", "Korai", "Lal Khan Mastoi", "Lashkar Khan Chandio", "Mastoi", "Mohammad Gujrani", "Mohmammadi Tanwari", "Saeed Khan Junejo", "Sher Khan", "Sijawal", "Soonharo Bhatti"],
    "Warah": ["Abad", "Ali Ashabo", "Anhoon", "Bisharat Kacheri", "Bisharat Khuhawar", "Bukechani", "Bund Jani", "Chak Faridabad", "Chak Faridabad no1", "Chak Faridabad no2", "Chakabad", "Chandni Jagir", "Cjhak Bisharat", "Gaji Khuhawar", "Garhi Jagir", "Garhi Markoro", "Gul Buriro", "Hamal", "Hamid wah", "Hassan Huri", "Jakhar", "Jogi", "Junani", "Kalar", "Khandoo", "Lalu raounak", "Maklani", "Mangneja", "Mirpur", "Mirzapur", "Nangdero", "Nawab Kalhoro", "Pechuha", "Potho", "Safar Tunio", "Sanhari", "Tahriri Hajran", "Thano`", "Theth", "Ubedani", "Wagan", "Warah", "Yarodero"]
  },
  "Kashmore": {
    "Kashmore": ["Badani Kacho", "Badani Pako", "Bai Rup", "Belo", "Bhanar", "Bindo Murad", "Buxapur", "Chachar", "Daro Jhando", "Domewali", "Elsi", "Gandheer", "Geehalpur", "Gishkori", "Gondak Kosh", "Gublo", "Gullanpur", "Haji Khan", "Jakhrani", "Jalal Sudh", "Kacho Bahadurpur", "Kacho Kashmore", "Kacho Khoski", "Karimabad", "Kath Garh", "Kauro Mahar", "Keejhar", "Khahi Kacho", "Khahi Pako", "Khewali", "Kubhar", "Kumb", "Kumbhri", "Line Purani", "Machhi", "Mahar", "Masoowalo", "Mekhan Bello", "Mithri", "Muhammadadani", "Noorpur Kacho", "Noorpur Pako", "Pako Bahadurpur", "Pako Kashmore", "Pako Khoski", "Rio Kacho", "Sain", "Samo", "Shah Ali Pur", "Shah Garh Kacho", "Shah Garh Pako", "Silachi", "Sodhi", "Sorah", "Thalho", "Toj", "Zor Garh"],
    "Kandhkot": ["Aalamabad", "Akhero", "Arain", "Babarwari", "Balochabad", "Bilhari", "Buxpur", "Chaman", "Dadar", "Dari", "Dhabhani", "Dhandhi", "Dhao", "Lahri Domki", "Doulatpur", "Fareed abad", "Garhi", "Ghoraghat Katcho", "Ghoraghat pako", "Ghouspur", "Gulabpur", "Haibat Katcho", "Haibat pako", "Jaffarbad Katcho", "Jageerabad", "Jangin", "Kajli", "Kandhkot", "Keti", "Khairwah", "Khan wah", "Khanbhri", "Kundharo Katcho", "Machko", "Makan maro", "Makhwani", "Malguzar", "Malheer", "Malookan", "Mangi", "Mari", "metahar", "Rasaldar", "Rejmatabad", "Shah mohd Jeelani", "Sunhiyanipur", "Teghani", "Wahidpur", "Wakro"],
    "Targwani": ["Allah abad", "Bahalkani", "Bargh", "Beghoo", "Bijarani", "Cheel", "Dabli", "Duniyapur", "Gazi", "Ghano Khoso", "Gudo", "Gulwali", "Hajano", "Hazaro", "Heeranpur", "Jaffarbad", "Jamal", "Jhalo", "Karampur", "Kari", "Khairo", "Kot dothi", "Lalao", "Lashari`", "Manjhi", "Mari jafar", "Nar", "Naseer", "Ninde ji Dhori", "Qureshi", "Saido kot", "Saifal", "Salghni", "Sanheri", "Sawan Gabol", "Shah gazi", "Sher garh", "Sherhan", "Sorwah", "Suhliyani", "Targwani", "Unar"]
  },
  "Khairpur": {
    "Khairpur": ["Aalipur", "Abad Jagir", "Atteri", "Baberloi", "Bhurgari", "Bindi Muhammad Panah", "Bugro", "Chaar Jagir", "Chhejro", "Danwaro", "Gujo", "Hajna Shah", "Jhaloji", "Keti Muhari", "Khairpur", "Khanpur", "Khariro", "Kouro Phulpoto", "Lalo Shedi", "Luqman", "Machyoon", "Mangi", "Mehar Ali", "Mitho Mari", "Nizamani", "Palh", "Paneero", "Panwari", "Phatt", "Phulwahan", "Pipri", "Pir Mangio", "Raina", "Shadi Shaheed", "Shah Bhangio", "Shah Ladhani", "Tando Masti", "Tando Nazar Ali", "Tando Nehal", "Therhi", "Ubhari", "Wassan", "Wisro Wahan"],
    "Gambat": ["Agra", "Baharo Dero", "Baharo Katcho", "Belharo", "Belharo Katcho", "Dhandan", "Dodo Bhutto", "Draza Chak-1", "Draza Chak-2", "Draza Chak-3", "Fato Sial", "Gambat", "Gangar", "Gigra Kalhora", "Golo Wahan", "Jado Wahan", "Jamra", "Kaleri", "Kamal Dero", "Keti Abhouro", "Keti Morio", "Keti Unar", "Khairo Dero", "Khemtia", "Khuhra", "Lakha", "Lal Kumbhar", "Mehro Pathan", "Miani", "Mujhid", "Nando Baharo", "Paleeja", "Paleja Kacho", "Phori", "Pir Esso", "Razi Dero", "Razi Dero Katcho", "Ripri", "Saidi Bala", "Saidi Lowor", "Sanhri", "Sarohi", "Satabo", "Shah Takio", "Sial Pathan", "Sial Pathan Kacho", "Sial Pathan/Agra Boring", "Tagar Chak-2", "Toori", "Wad Pagia"],
    "Kingri": ["Abdullah Kalhoro", "Ahmed Pur", "Baharpur", "Bambho Khoruam", "Beli Chani", "Bhambho Dero", "Chachar", "Denal Shah", "Drib Rozi", "Fareed Abad`", "Fateh Ali Chandio", "Gahno Kalhoro", "Garhi", "Mori", "Gadhi", "Ghuriri", "Gumchi", "Kainchi", "Kanjan", "Katohar", "Keti Pandhi", "Keti Mehar", "Kingri", "Kolab Jail", "Langah", "Mangerji", "Manghanwari", "Mari", "Mian Khan", "Miano", "Mitho dero", "Mohil", "Noorpur", "Paki Khohi", "Pir Shahbazi", "Piryalo", "Qaim Kalhoro", "Rafique Mahesar", "Rahouja", "Rajo Dero", "Sadarji", "Saeed pur", "Saidi", "Sri Ghanwar Khan", "T.M.Hyder", "Ulra Chak 1", "Ulra Chak 2", "Ulra Chak 3", "Ulra Chak 4"],
    "Kotdiji": ["Agha Hashim Shah", "Ali Muhammad Machhi", "Arab Machhi", "Arbani", "Babar", "Bago Dharo", "Baharo Lashari", "Bakho Lashari", "Bapho", "Chhudahu", "Chouniro", "Dadloo", "Dhukar", "Fateh Pur", "Goondariro", "Hussainabad", "Jahndo Mashaikh", "Jiskani", "Junna", "Kanasira", "Khuda Bux Hisbani", "Kotdiji", "Kotlu", "Layari", "Luhrani", "Malku Wahan", "Mehrano-1", "Mehrano-2", "Mir Khan Muhammad", "Mithan Fakir", "Mithri", "Muhammad Hajam", "Muhbat Wah", "Nagrija", "Naro Dhoro", "Nasir Fakir", "Nawab Wassan", "Nebahu Patta", "Noor Bozdar", "Panhwari", "Patta", "Pir Gudo", "Pir Misri", "Qaim Gopang", "Raban Rajper", "Rajpari", "Rind", "Shafi Muhammad Ujjan", "Sohu", "Sono Gopang", "Talpur Wada", "Tando Shah", "Wali Muhammad Bhatti"],
    "Mirwah": ["Ahmed Ali Wah", "Allah Dino Amur", "Allah Wasayo Depar", "Bago Dhoro", "Bozdar", "Chutto Wandier", "Dato Dasti", "Deparja", "Dhedhano", "Faiz Muhammad Mojai", "Gabar", "Gahi Chakrani", "Gigro", "Habib Phull", "Halepota", "Hindyari", "Jalalani", "Jalbani", "Jangwaro", "Jeorge Ali Murad", "Kalro", "Kanchhi", "Kharirah", "Khuda Bux Kubar", "Mandan", "Maroro", "Matt", "Mengho Shar", "Mossan Shah", "Mothar", "Muhammad Ashabi", "Mureed Haji", "Nazim Shar", "Pirwasan", "Punihar", "Ranyah", "Sabar Rind", "Saindad Haji", "Saindad Machhi", "Saneso", "Sanjrani", "Sawri", "Seri", "Shah Nawaz", "Sher Khan Lund", "Soofai", "Sutyaro", "Tali", "Tando Mir Ali", "Tarko", "Telahu", "Thari", "Wagah", "Wali Dad Lund", "Waryam Wandier"],
    "Nara": ["Ahsan jaro", "Beewari", "Bewatoo", "Bhait tharoji", "Bhaongiwari", "Bhit bhonji", "Bhit kindari", "Bux ali aradin", "Chachro", "Chhohar shar", "Choondko-1", "Choondko-2", "Dadu", "Dandh simmi", "Daoji", "Darbhoo", "Dedhano", "Dingari", "Dodiwari", "Geandhaou", "Ghulam Hussain", "Gogo", "Gulab bhanbhro", "Idhoie", "Illyas wari", "Jhuryaro", "Jubo", "Kamaraho", "Katgarh", "Kathore", "Kharch", "Khenwari", "Kherap", "Kirari", "Kiri aradin", "Klahoo", "Ladhou", "Laiwari", "Lemoo rajpar", "Luck turko", "Methari", "Muhammad khan bhurgari", "Nisrullah", "Pateji", "Patel pota", "Pharhiyaro", "Pir bux aradin", "Pir bux gaho", "Pir ibu", "Razo bhanbhro", "Sarhadano", "Saido", "Sami pota", "Santarahoo", "Soomarwari", "Sorah", "Tahroji", "Taj muhammad mullo", "Tajal"],
    "Faiz Ganj": ["Abdullah Hisbani", "Akri", "Akro", "Allah Warayo", "Amin Pato", "Anheeri", "Anoi", "Araro", "Aub", "Baseero", "Bather", "Bhangu Behan", "Budho Mullo", "Buo", "Cheena", "Chibherero", "Derah", "Dhundh", "Gadano", "Ghulam Nabi", "Hussain Shah", "Hussian Pato", "Izat Shar", "Jaffar Lashari", "Jakhereri", "Jalalji", "Kandiari", "Karam Khan", "Karoondi", "Khair Muhammad", "Khinyari", "Khuteero", "Kot Laloo", "Kup", "Lakhrand", "Mari", "Mehar Ali Unar", "Mitho Chang", "Moheja", "Mohib Shah", "Nangar Shah", "Nazar M.Behan", "New Laheero", "Nindhero", "Pacca Chang", "Palyo Lashari", "Paneeri", "Pario Mari", "Pholahri", "Prano Laheero", "Punhal Rajper", "Radhan Mashaikh", "Rattar", "Sahito", "Sijawal Rajper", "Tarai", "Uman", "Usman Mullo", "Wahleer"],
    "Sobho Dero": ["Abdul Karim Kharal", "Bhellar", "Bhombhatpur", "Bindi Motayio", "Chutto Channo", "Gaddeji", "Gahno Bhagat", "Hingoreja", "Kazi Bhutta", "Keti Kanoori", "Keti Moosa Bughio", "Keti Noorpur", "Khalifa Huryah", "Kharal", "Kot Chandiko", "Larik", "Machhar", "Maddd", "Mangi Mari", "Mangnapota", "Meerak", "Mehnidero", "Mir Khan Shahani", "Niwaro", "Noor Pur Katcho", "Noor Pur Reyasat", "Pialo", "Pir Mashaikh", "Pir Taj Muhammad", "Pir Umar Shah", "Rahopota", "Ranipur", "Ranipur Road", "Rasoolabad", "Rukrani", "Sagyon", "Sahita", "Sami", "Setaerja Bala", "Setharja Lower", "Shah Awais", "Sobhodero", "Thatti", "Tunia", "Watani"]
  },
  "Larkana": {
    "Larkana": ["Agani", "Ahmed Pathan", "Akil", "Bago Vighamal", "Baid Sangi", "Bero Chandio", "Bindi", "Bugti Baloch", "Chakar Ali", "Chuharpur", "Chutto Mahesar", "Dara Gaad", "Dhamrah", "Dodai", "Fatehpur", "Fati Bilwal", "Ghanghro", "Illyas", "Jamarani", "Jiand Jatoi", "Kanga", "Kathar", "Kathoro Bado", "Khalid", "Khedkar", "Kothi", "Lahno Samito", "Lahori", "Langh", "Larkano", "Loungai", "Lund", "Masu Hab", "Mitho Dero", "Miyani Nihal", "Morio Khuhro", "Nangar Sangi", "Nasurullah", "Nau Abad", "Nazar Thariri", "Nindero", "Phul", "RasheedWagan", "Rato Kot", "Rato Kot Rayati", "Sache Dino Kalhoro", "Sanhri", "Soomar Sangi", "Sultan Abro", "Talbani", "Valeed", "Vikia Sangi", "Wah Nabi Bux", "Zakrio Mahesar"],
    "Rato Dero": ["Phulpota", "Akil Hakro", "Banguldero", "Bhahman", "Bhando Rato", "Bhutta", "Bossan", "Chajra", "Chhango Rahujo", "Daranpur", "Doda Khan Bhutto", "Dosu Dar", "Drabhi", "Fatehpur", "Gachal", "Gh. H. Hakro", "Jumo Agham", "Kalar Sarkari", "Khairodero", "Khan Wah", "Khuda Bux Bhutto", "Kodrani", "Kohri", "Kubro", "M.K Jalbani", "Mamo Jagir`", "Mamo Rayati", "Masu Dero", "Mevo Ghanghro", "Miyani Noor Malah Jagir", "Miyani Noor Mallah Rayati", "Moria Faqir", "Mullan Kalhora", "Naudero", "Nazar Detho", "Nazar Ghangro", "Noor Pur", "Panju Abro", "Panju Kinaro", "Panju Lorir", "Patro", "Pawro", "Pir Bux Bhutto", "Rahuja", "Rajudero", "Saidodero", "Salar Janwari", "Sanjar Abro", "Sarho Ghanghro", "Shadi Abro", "Shadi Agham", "Sharif Pur", "Tayyab", "Unar", "Wali Dad Veesar", "Waris Dino Machhi", "Wassand Jeho", "Wassayo Bhutto", "Yaru Pitafi", "Zangehja"],
    "Dokri": ["Abrepota", "Baburi", "Badah", "Bagi", "Bhangia Kalhora", "Beli gaji", "Budho dero", "Chakro", "Dabuli Vechob", "Dokri", "Fateh pur", "Gaji dero", "Ghanghriko", "Gujar", "Jadam Kalhoro", "Kabuli", "Karani", "Khachar pur", "Khair wah", "Khairo jhatiyal", "Khooh Norang", "Latri", "Mirzai", "Nari Lashari", "Samitia", "Seehar", "Sui", "Tiger", "Veehar", "Wakro", "Yaru Lakhair"],
    "Bakrani": ["Abad", "Amrot", "Arija", "Bakrani", "Baqa Pur", "Behleem", "Belhari", "Bhutta Kalhora", "Dandano", "Daro Dodaiko", "Darya Khan", "Dhandhra", "Fareed Abad", "Ganjo", "Garello", "Gud", "Hassan Wahan", "Jatoi Chachar", "Kania", "Kanuri", "Karira", "Kot Chandiko", "Mad Bahu", "Mahar Wada", "Mato", "Mehrab Pur", "Mir Khan Abro", "Nasirabad Jagir", "Nasirabad Rayati", "Noor Pur", "Panjo Khohkhar", "Salhani", "Shah Baig", "Shah Nawaz", "Shaikh Fojo", "Simno", "Sunhari Jagir", "Sunhari Rayati", "Tagar", "Thullah", "Yako Sandilo"]
  },
  "Matiari": {
    "Hala": ["Bhanbhri", "Bhanoth", "Bhit Shah", "Bundh", "Bunglow", "Bureri", "Char", "Dhabri", "Gahoth", "Gaib peer", "Ghoghat", "Ghotana", "Hala", "Hala old", "Jamlabad", "Jhirki", "Kalri", "Katcho Khanoth", "Keeriya", "Khandu", "Khanoth", "Kutkai", "Lakhisar", "Narli", "Nizamani", "Nooralabad", "Noorketi", "Pir Bilawal", "Rechal", "Rojhani", "Salaro", "Sandhan", "Shaikhani", "Tarah", "Verato"],
    "Matirai": ["Abrejani", "Arain", "Barechani", "Baudero", "Bhanoki", "Bhorko", "Buhryoon", "Chharao", "Dhando", "Ganag rayati", "Gang jagir", "Hakra", "Jaheki", "Jaindal Kot", "Jakhri jagir", "Jakhri Joya", "Jakhri rayati", "Ketti", "Khorkhani", "Khudi", "Khyberani", "Koheki", "Lutryoon", "Mari", "Matiari", "Mubarak wah", "Nindero", "Oderolal", "Palijani", "Panhwarki", "Pano", "Porath", "Reechal", "Sadri", "saeedpur", "Sahib Saman", "Sattar", "Sekhat", "Shahpur", "Sipki Jagir", "Sipki Rayati", "Soiki", "Soomra", "Sultanpur", "Tajpur", "Thano", "Thorha", "Vesro", "Wassan"],
    "Saeedabad": ["Ahano", "Amin lakho", "Bawri", "Chhachhri", "Chhapar kahan", "Chitori", "Dalo keti", "Dethki", "Fatehpur", "Gadali", "Giss", "Jamali", "Kaka", "Khatoori", "Khuteero", "Koonar", "Larh", "Manahi", "Odiyanoo", "Panjmoro", "Peengharo Jagir", "Peengharo Raieti", "Rahoo", "Rahooki", "Ranoo", "Saeedabad", "Suhrabpur", "Zairpir"]
  },
  "Mirpurkhas": {
    "Mirpurkhas": ["PanhwarKi", "Khuth"],
    "Digri": ["169-Digri", "141", "142", "144", "147", "148", "149", "150", "151", "152", "154", "155", "156", "157", "158", "159", "160", "161", "163", "164", "166", "167", "168", "170", "171", "172", "173", "174", "176", "177", "178", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "191", "192", "193", "194", "195", "196", "197", "199", "200", "201", "204", "206", "262", "263", "265", "143-Abadgar", "144-A", "146-Leghari", "153-Pabban", "161-A", "162-A", "162-Mir Mohd Hassan", "165-Sonhari", "175-abring", "179-Mehar", "190-Qazi Ashraf", "198-A", "198-Basran"],
    "Hussain Bux Mari": ["101-Mirpurkhas", "77", "80", "81", "88", "89", "90", "92", "93", "96", "97", "98", "99", "102", "103", "104", "106", "107", "108", "109", "110", "112", "113", "114", "115", "116", "117", "119", "120", "121", "122", "123", "125", "100-Pir Azeem Shah", "105-Bhitaro", "111-Mirpur Old", "118-Veesro", "71-Sikanderabad", "78-Sakho", "79-A", "79-Patoyoon", "81-A", "82-A", "87-M.h.Mari", "91-Khan", "94-Miro Mari", "95-Khudri"],
    "Jhudo": ["309-Bandwari", "203", "205", "264", "310", "311", "312", "314", "315", "316", "317", "341", "342", "344", "352", "353", "354", "355", "356", "357", "360", "362", "363", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "202-mir Khuda bux", "313-Jhudo", "318-A", "318-Roshanabad", "319-A", "319-B", "319-C", "319-mir Malik Mohd", "340-Gunero", "341-A", "343-Karam Ali", "344-A", "345-A", "354-A", "358-A", "358-Bakhar", "359-Bilalani", "366-A", "367-A", "368-A", "370-A", "373-A", "Akhuto", "Athela", "Dehti", "Janhan", "Samroti", "Udhejani"],
    "K.G.M.B": ["290-A", "209", "211", "212", "213", "215", "216", "218", "222", "223", "230", "231", "232", "233", "234", "235", "252", "253", "255", "257", "261", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "287", "288", "289", "290", "291", "292", "293", "295", "296", "297", "298", "300", "301", "302", "303", "305", "306", "307", "308", "320", "321", "322", "323", "324", "329", "331", "332", "333", "334", "335", "336", "338", "345", "346", "347", "348", "349", "350", "351", "208-TAgi", "210-Kalwari", "214-Murad shah", "221-Dengan", "251-Chanuro", "254-Gorchani", "256-Wagherji", "258-Kachelo", "259-Sodha Bore", "260-Khudabad", "268-A", "270-A", "274-A", "279-A", "286-Rajwah", "294-Sakari", "299-Lal shah", "301-A", "303-A", "304-A", "304-kario Pipar", "308-A", "320-A", "320-B", "322-A", "328-A", "328-Chach", "330-Berani", "337-Jalabad", "339-A", "339-Jawariasar", "348-A", "349-A"],
    "Shujabad": ["140", "145", "217", "224", "225", "236", "237", "238", "239", "243", "244", "245", "246", "247", "248", "249", "250", "378", "379", "380", "381", "382", "383", "384", "385", "107 A", "377-Dolatpur", "Belaro", "Boorji", "Chahoo", "Chand Morio", "Chelaro", "Dhanghki", "Kak", "Kantrai", "Khandar", "Khumbri", "Manjri", "Mirwah", "Mubarak", "Pannonundani", "Phadro", "Sangro", "Seri", "Toori"],
    "Sindhri": ["128-Kathri", "73", "75", "76", "124", "126", "127", "129", "130", "131", "132", "133", "134", "135", "137", "138", "226", "227", "228", "229", "240", "241", "242", "136-Jhurbi", "72-Chitori", "74-Khirah", "Allah Bux Mari", "Allah Khani", "Ameen Aukar", "Assassar", "Atna", "Bhanusar", "B-Khirah", "Chari Bux Pahore", "Chari Manglan", "C-Potho", "Dahoro No:1", "Dahroro No:2", "Dhair Mitho Faqir", "D-Khandar", "Dobto", "Fateh Muhammad Mashakh", "Ganbo faqir", "Gichar", "Girhore Sharif", "Halepotani", "Hanjarhadi", "Hingorno", "Jamilani", "Kahroro", "Kakeji", "Kander", "Kangal", "Kani Maghrio", "Khani Maghrio", "Kheer Tarai", "Laiqpur", "Liyari", "Lund", "Malook halepoto", "Nindo Junejo", "Palango", "Phulahdyun", "Potho", "Rawatro", "Saidki", "Saifal No:1", "Saifal No:2", "Sain dad Chhoro", "Sarhal", "Sarhari", "Sindhri", "Tagusar", "Talho Junejo", "Walwari", "Warariyon"]
  },
  "Naushahro Feroze": {
    "Naushahro Feroze": ["Abji", "Agham", "Arban", "Batil", "Bhanbhri", "Bhurnd", "Bookar", "Chanari", "Changal", "Cheeho", "Dall", "Danheja", "Dhori Bachal", "Gejh No 2", "Gejh No1", "Ghanghro", "Izzat Waggan", "Jarri", "Jiskani", "Kajhar", "Kalooro", "Kalro", "Kanghal", "Keti Abu Bakar No1", "Keti Abu Bakar No2", "Khariro", "Khuhawar No.1", "Khuhawar No.2", "Khuhi Jalal", "Koor Gahno", "Koor Hassan", "Loothi", "Masur Ji Wai", "Menghlo", "Miranpur", "Mithiani No.1", "Mithiani No.2", "Mubejani", "Nathar Detha", "Naushahro", "Noor Pur", "Paddidan", "Panjo", "Parya", "Phull", "Pir Parto", "Sahib Khan", "Seengarchi", "Serhal", "Sher Khan", "Shuja Muhammad", "Tetri", "Thatt No 1", "Thatt No2", "Veesar", "Wagan", "Wassan", "Wassayo"],
    "Moro": ["Abad Kahkot", "Belo Khero Dero", "Belo Lalia", "Bet Budho", "Bhambhro Dero", "Borarai", "Chando", "Chaneja", "Dalchand", "Daris", "Deparja", "Dheeran Jagir", "Dilo Shah", "Doro Behan", "Dumber Ji Wai", "Fareed Dero", "Fato Balal", "Fazil Jagir", "Ganghan Jagir", "Ghairabad Kahkot", "Gharho", "Junalo", "Kacho Koheri", "Kalhora", "Karap", "Kareja", "Karocho", "Kenchi Jagir", "Khair Wah", "Khaliso", "Khero Dero", "Khokhar", "Korai", "Kot Satabo", "Lalia", "Lett", "Lundki", "Malkani", "Manaheen", "Mari", "Miran Jatoi", "Misri", "Moro", "New Gachero", "Old Gachero", "Qaim Koor", "Sadhuja", "Saleh Pur", "Sehra", "Sultan Behan", "Wad Pagia", "Waryaso Jagir", "Waryaso Rayati"],
    "Meharabpur": ["Bago Daro", "Behlani", "Bhorgi", "Chibhar Babhan", "Deengaro", "Dehat", "Dewan", "Dodha", "Godho Hindu", "Halani", "Hote Khan Jalbani", "Jaindo Rajper", "Khakhri", "Kharik", "Khuda Bux Jalbani", "Kotri Kabeer", "Langarji", "Mad Ibyani", "Mehar Haji", "Meharabpur", "Moule Dino Haji", "Natho Rajper", "Nau-Abad", "Peer Waito", "Punjaban", "Qaisar Mari", "Rajo Dahri", "Saeed Pur", "Saleh Sahito", "Sangi", "Sittar Dino Mangrio", "Syed Shuja", "Tuttah", "Vighia Mal"],
    "Kandiaro": ["Abad-111", "Bahri-1", "Bahri-2", "Bazidpur", "Beelo kamaldero", "Bello mohbatdero", "Bello sumita", "Belo Bhounar", "Bhagodero-1", "Bhagodero-2`", "Bhority", "Budak", "Chachak", "Dabhro", "Darbelo new", "Darbelo old", "Detha", "Ghanghra", "Ghulam shah", "Gul shah", "Haji shah", "Jea pota", "Kalatagar-1", "Kalatagar-2", "Kamaldero-1", "Kamaldero-2", "Kandhar", "Kandiaro", "Khairodero", "Khanwahan", "Kouro khushik", "Ladho bisharat", "Lakha", "Larik", "Lundi", "Machi", "Mahessar", "Manjuth", "Mirzapur", "Mohbat dero Jagir", "Mohbatdero Siyal", "Moria", "Mosodero", "Pirmard", "Sahita", "Salehpur", "Samita", "Sethar`", "Shah mirdero", "Shanikhani", "Sona bindi", "Thatt moosa"],
    "Bhiria": ["Baran", "Bella Wah", "Bhiria", "Bhiro", "Burira", "Chaheen Manomal", "Chakar Wah", "Dali", "Dalipota", "Dheengaro", "Dingaro", "Gher Gujo", "Jalbani`", "Kajar", "Kandir", "Khah Jagir", "Khahi Mamon", "Khahi Qasim", "Khahi Rahu", "Kot Bahadur", "Ladho Rano", "Machur", "Madd Aleem", "Mango", "Molhan Jagir", "Molhan Rayati", "Palano", "Panhwari", "Pano Usman", "Rajo Keerio", "Soondhan", "Tharushah"]
  },
  "Sanghar": {
    "Sanghar": ["Ait Par", "Akanwari", "Awadh", "Bachna", "Bahram Bari", "Bakhoro", "Bao Khan", "Baqar", "Bassi", "Bobi`", "Chah Kabir", "Chamaro", "Chotiaryon", "Dabhri", "Dareri", "Darero", "Daro Bazaar", "Dhilyar", "Dhoro Janib", "Dighal", "Dilshad Dario", "Dim", "Dodan Ja Kanda", "Dubi", "Gharo", "Hamzi Ji Khad", "Harathri", "Jakhro", "Jhun", "Kalar", "Kandiari", "Kehor", "Khadwri", "Khakharo", "Kundho", "Lib", "Loharro", "Lutko", "Makhi", "Mano Khan Chandio", "Mihroo", "Mohd Ali Wah", "Photo Dhoro", "Pir Kehor", "Rachar", "Raj Wah", "Rar", "Rip", "Rohero", "Sadhano", "Sadrat", "Sahar Pir", "Samathri", "Samoor", "Sanghar", "Sanharo", "Santore", "Sareji", "Sethar Pir", "Sim Janido", "Sinhori", "Siran Wari", "Tando Mitha Khan", "Thar Sareji", "Thar Siran Wari", "Togacho", "Toori", "Waghyoon", "Yaro Hingoro"],
    "Jam Nawaz Ali": ["Berani", "Darhan", "Mari", "22-Dim", "23 Dim", "24 Dim", "25 Dim", "26 Dim", "42 Jamrao", "43 Jamrao", "44 Jamrao", "45 Jamrao", "46 Jamrao", "47 Jamrao", "48 Jamrao", "49 Jamrao", "50 Jamrao", "51 Jamrao", "52 Jamrao", "53 Jamrao", "54 Jamrao", "55 Jamrao", "56 Jamrao", "57 Jamrao", "58 Jamrao", "59 Jamrao", "60 Jamaro", "61 Jamrao", "62 Jamrao", "63 Jamrao", "64 Jamrao", "65 Jamrao", "66 Jamrao", "67 Jamrao", "68 Jamrao", "69 Jamrao", "70 Jamrao", "82 Jamrao", "83 Jamrao", "84 Jamrao", "84-A Jamrao", "85 Jamrao", "86 Jamrao", "Bhadar", "Bhiro", "Hasan Ali", "Hot Wassan", "Jam Jani", "Jampur", "Mashaikh Odho", "Raj Pari"],
    "Khipro": ["Amli", "Bakherji", "Bantheri", "Bawarli", "Bawarlo", "Bhatyani", "Bhit Bhaiti", "Bhopi", "Boreji", "Chanesari", "Chounro", "Dakhna", "Dar", "Dhadh Liari", "Dhadhro", "Dhilyar A.Hadi", "Dhilyar Rukan", "Ding", "Dugo", "Ellachi", "Ghandelan", "Girhar", "Gorilo", "Halaro", "Hathungo", "Jiao", "Juman", "Kadh", "Kadh Kandiari", "Kamaro", "Kanchhari", "Kangani", "Kaniro", "Kathoro", "Keti", "Khahi", "Khajni", "Khambharo", "Khani Rajar", "Kheerhadi", "Khipro", "Khori", "Khorilo", "Khorlio", "Kirayari", "Koorthari", "Kunri", "Lakhisar", "Loon Khan", "Manhoori", "Marvi", "Mathoon", "Moorhadi", "Moorkadh", "Nehar", "Nian", "Ona Thada", "Pabban", "Paneri", "Pehalwano", "Pharanhadi", "Rahundro", "Ranak Dehar", "Rar", "Rebhan", "Roonjho", "Samarjo", "Samnhar", "Sandh", "Senhoji", "Sigh", "Singhar", "Tarachho", "Tharahadi", "Wadhal", "Waniyani", "Warhiyan"],
    "Sinjhoro": ["Sinjhoro", "01 Dim", "02 Dim", "07 Dim", "1 Jamrao", "10 Dim", "10.Jamrao", "11 Dim", "11 Jamrao", "12 Dim", "12 Jamrao", "13 A Jamrao", "13 Dim", "13 Jamrao", "14 Dim", "14 Jamrao", "15 Jamrao", "15.Dim", "16 Jamrao", "16.Dim", "17 Jamrao", "17.Dim", "18 Jamrao", "18.Dim", "19 Jamrao", "19.Dim", "2.Jamrao", "20 Jamrao", "20.Dim", "21 Jamrao", "21.Dim", "22 A Jamrao", "22 Hingora", "22 Jamrao", "23 Jamrao", "24 Jamrao", "25 Jamrao", "26 Jamrao", "27 Jamrao", "28 Jamrao", "29 Jamrao", "3 Dim", "3.Jamrao", "30 Jamrao", "31 Jamrao", "32 Jamrao", "33 Jamrao", "34 Jamrao", "35 Jamrao", "36 Jamrao", "37 Jamrao", "38 Jamrao"]
  },
  "Shaheed Benazirabad": {
    "Daur": ["100-Nasrat", "101-Nasrat", "105-A Nasrat", "105-Nasrat", "106-Nasrat", "107-Nasrat", "108-Nasrat", "109-Nasrat", "10-Dad", "10-Nasrat", "110-Nasrat", "111-Nasrat", "112-Nasrat", "113-Nasrat", "114-Nasrat", "115-Nasrat", "116-Nasrat", "117-Nasrat", "11-Dad", "11-Nasrat", "12-A-Nasrat", "12-Dad", "12-Nasrat", "13-Nasrat", "14-Nasrat", "15-Nasrat", "16-Nasrat", "17-Nasrat", "18-Nasrat", "19-Nasrat", "1-Nasrat", "20-Nasrat", "21-Nasrat", "22-Nasrat", "23-Nasrat", "24-Nasrat", "25-Nasrat", "26-A Nasrat", "26-Nasrat", "27-Nasrat", "28-Nasrat", "29-Nasrat", "2-Dad", "2-Nasrat", "30-Nasrat", "31-Nasrat", "32-Nasrat", "33-Nasrat", "34-Nasrat", "35-Nasrat", "36-Nasrat", "37-Nasrat", "38-Nasrat", "39-Nasrat", "3-A Dad", "3-Dad", "3-Nasrat", "40-Nasrat", "41-Nasrat", "42-Nasrat", "43-Nasrat", "44-Nasrat", "45-Nasrat", "46-Nasrat", "47-Nasrat", "48-Nasrat", "49-Nasrat", "4-A Dad", "4-Dad", "4-Nasrat", "50-Nasrat", "51-Dad", "51-Nasrat", "52-Nasrat", "53-Nasrat", "54-Nasrat", "55-Nasrat", "56-Nasrat", "57-Nasrat", "58-Nasrat", "59-Nasrat", "5-Dad", "5-Nasrat", "60-Nasrat", "61-Nasrat", "62-Nasrat", "63-Nasrat", "64-Nasrat", "65-Nasrat", "66-Nasrat", "67-Nasrat", "68-Nasrat", "69-Nasrat", "6-Nasrat", "70-Nasrat", "71-Nasrat", "72- Nasrat", "72-A Nasrat", "73-Nasrat", "74-Nasrat", "75-Nasrat", "76-Nasrat", "77-Nasrat", "78-Nasrat", "79-Nasrat", "7-Dad", "80-Nasrat", "81-Nasrat", "82-Nasrat", "83-Nasrat", "84-Nasrat", "85-Nasrat", "92-Nasrat", "93-Nasrat", "94-Nasrat", "95-Nasrat", "96-Nasrat", "97-Nasrat", "98-Nasrat", "99-Nasrat", "Akro", "Akro-2", "Akro-3", "Akro-4", "Akro-5", "Akro-5/A", "Akro-6", "Akro-7", "Akro-8", "Akro-9", "Amerji", "Chack-2", "Chack-3", "Chack-4", "Chack-5", "Chack-6", "Chak 1to 11 Suhelo", "Chak 1to6 O/Sawri", "Chhan Babu", "G.A Dago", "G.A Daur", "G.A Makhand", "Gojro", "Goongothar", "Gujhro", "Gupchani", "Jhemal", "Jhip", "Kalri", "Mari Sabhar", "Obhari amerji chak-2", "Obhari amerji chak-3", "Obhari sawari", "Panjo Chan", "Shah Hussain", "Suhelo chack-2", "Suhelo chack-3", "Suhelo chack-4", "Suhelo chack-5", "Suhelo chack-6"],
    "Qazi Ahmed": ["Abad Makkhand", "Ahmed Bughio", "Allah Khai", "Amerji", "Bambhai", "Bambhai Jagir", "Bet Safan", "Bhellaro", "Bogri", "Charioro", "Daulatpur", "Deran", "Dim", "Drigh", "Gair Abad Makhand", "Haberi", "Hothepota", "Jari", "Jarkhoyaro Jagir", "Jarkhoyaro Rayati"]
  },
  "Sukkur": {
    "Saleh Patt": ["Matto MAngrio", "Muhib shah", "Murado", "Nihrad", "Panhwari", "Phat", "Phulokri", "Pir Buxji Bhit", "Pir Karo", "Rajar", "Registan Kartar", "Registan Mamro", "Rip", "Sadano", "Sadri", "Sahi Pat", "Sanghar", "sanhari", "Sanharo", "Setharo", "Shadmano", "Shah Nawaz Shah", "Siran Waro", "Soomarji", "Soonharo", "Sunhari Takar", "Tarai", "Thomi", "Tooryoun", "Udhar", "Ukri Takar", "Umerji", "Umerji Kandun", "Veenghko", "Viyari", "Wass"]
  },
  "T.M.Khan": {
    "T .Gh.Hyder": ["Adhanki", "Ahmedani", "Ajaib Pur", "Arazi", "Bariji", "Bhanki", "Chachri", "Chak", "Chandia", "Charo", "Choubandi", "Dando", "Dauki", "Debgeri", "Doderi", "Fateh bagh", "Gulshan", "Habach", "Jagsiyani", "Jahbgeri", "Jarki", "Jiayath", "Jio", "Jonathi", "Jumoon Jakhro", "Karo Mehro", "Kath Bhambhen", "Khaso", "Kodario", "Kor rahimoon", "Lakara", "Lakhi", "Lashari", "Machari", "Mahi Laghari"],
    "Bulri shah Karim": ["Narki", "pakhro", "Pakhyarki", "Pir wah", "Qabool pur-II", "Qaboolpur", "Qanadani", "Rain", "Rayati Shor", "Saeed pur", "Sahrani", "Samejani", "Samepotani", "Sandki", "Sathiar", "Shorki", "Sonehri", "Soomerki", "Soomra", "Soorjani", "Sun", "Tikhar", "Umaid Ali Jat"]
  },
  "Tando Allahyar": {
    "Jhando Mari": ["Aelchi", "Bulghia", "Chhachharki", "Daro Sutah", "Daseeri", "Dhaghki", "Gahaiki", "Ghado", "Hadeki", "Halepotani", "Mashaikh Hothi", "Hingorani", "Hotki", "Kathari", "Kehi", "Khado", "Koraiki", "Koryani", "Langhano", "Mail", "Makhoro", "Missan", "Narahado", "Nelorai", "Nimro", "Noori", "Palhi", "Rajpari", "Rappar", "Roopah", "Sajnah", "Seharki", "Seharpur", "Sonhari", "Thebaki", "Vesarki", "Wagori", "Waryaso"],
    "Tando Allahyar": ["Amri", "Bhanoki", "Bhatti", "Bukerani", "Dalki", "Daro Qubi", "Dhandh Shah", "Dhoro lakhmir", "Ghab", "Gujjo", "Kamaro", "Khokhar", "Lakhyar", "Mareji", "Mehmoodani", "Nahiki", "Nasarpur", "Pak Singar", "Reechhal", "Shaikh Mooso", "Sohna Bukera", "Tando Allahyaar", "Wagodar", "Wasanki"],
    "Chambar": ["Arraro", "Bail", "Buchar", "Chachh", "Chamber", "Chanbeerah", "Dhaloo", "Garho Sadar", "Jarki", "Jaryoon", "Jhole", "Kandiyari", "Kapaho", "Karyo Gulsher", "Landhi", "Larah", "Lootko", "Mangria", "Meerankhori", "Nagnah", "Noondani", "Saheki", "Sajarchang", "Sandki", "Sehajro", "Sutiyari", "Tarahdi", "Thull", "Wangi"]
  },
  "Thatta": {
    "Thatta": ["Aali Soomro", "Abad", "Agheemani", "Amir Pir", "Bao Purandas", "Bello Bao Purandas", "Bello Chach", "Bello Garkho", "Bello Hellaya"]
  },
  "Tharparkar": {
    "Chachro": ["Charnore", "Dhakalo", "Dharendharo", "Hinjtal", "Hirar", "Janjhi", "Kantio", "Khudi", "Milkam", "Mithrio Charan", "Pabuvero", "Rajoro", "Rarli", "Rawatsar", "Saranghiar", "Tar Hameer", "Tardos"],
    "Dahli": ["Allah Rakhio Jo Par", "Charihar", "Dahali", "Deburi", "Dohri", "Gadhro", "Gul Muhammad Rahimoon", "Jesse Jo Par", "Jogivero", "Kalario", "Kamanhar", "Khariryoon", "Kheensar", "Kheme jo Par", "Laplo", "Neblo", "Parno", "Pirano Par", "Rohar Kelhan", "Sajan Par", "Siyar", "Tar Ahmed", "Verari"],
    "Diplo": ["Balihari", "Bhitaro", "Bolhari", "Chhachhi Moora", "Chhai Chhapro", "Chhapanhar", "Dabhro", "Deengario", "Diplo", "Dodharo", "Dohar", "Hamera Beh", "Jangh", "Kaloi", "Kharak", "Khetlari", "Kounral", "Kun Rehmatullah", "Layari", "Melanhar", "Murad Lashari", "Nabisar", "Paneli", "Phant", "Piloori", "Rajar", "Sadoi", "Sajai", "Sandook", "Saran", "Sedio", "Seengario", "Serhi", "Sobhiar", "Soomrasar", "Talo", "Tando Niazi", "Thohar Chhaho", "Turkiar"],
    "Mithi": ["Veenjhiar", "Vijuto", "Wassaepota"],
    "Nagarparkar": ["Adhigam", "Balhiari", "Behrano", "Bheemaveri", "Chotal", "Churio", "Dabho", "Dandhoro", "Dhengano", "Ghoti", "Goozri", "Harho", "Hirar Deda", "Kasbo", "Kharirio", "Kharoro", "Ladhovarni", "Mamchero", "Mehrano", "Misri Shah", "Mithrio Juneja", "Mondhro", "Nagarparkar", "Onhair", "Orhamar", "Parodharo", "Piloo", "Pithapur", "Ranpur", "Rathi", "Sabhusan", "Sadooras", "Satidera", "Shivlo", "Somreth", "Soorachand", "Tigusar", "Virawah"]
  },
  "Umarkot": {
    "Umarkot": ["Aahir East", "Ahori Chore", "Makhyaro", "Mandhal", "Marwah", "Mehparo", "Mokhal Bah", "Muhammad Aalam Palli", "Nabisar Thar", "Narhadi", "Noonhyoon", "Okkaro", "Old Chore/Chore Purano", "Padrio", "Panjoi", "Parhyaro", "Rabario", "Rajar Thar", "Rajari Thar", "Sabhri Pat", "Sabhri Thar", "Sabo", "Sadoori Pat", "Sadoori Thar", "Sahib Tar", "Sarangsar", "Sarreti", "Senhoi Thar", "Shakh Khejrari", "Shekhro", "Sidhore", "Sonhari", "Sonpur", "Soofi", "Soonhin", "Tal", "Tangore", "Tar Samoon", "Tebhri", "Thathrai", "Timo Mitho", "Umerkot Pat", "Umerkot Thar", "Veerasar", "Vehro Thar", "Walhate", "Walidad Palli"],
    "Samaro": ["207", "325", "326", "327", "12-Hiral", "13-A Hiral", "13-Hiral", "14-Hiral", "15-Hiral", "16-Hiral", "17-Hiral", "18-Hiral", "19-Hiral", "207-A", "20-Hiral", "21-Hiral", "22-Hiral", "23-Hiral", "24-Hiral", "25-Hiral", "26-Hiral", "27-Hiral", "28-Hiral", "29-Hiral"],
    "Kunri": ["Malook Shah", "Manjhakar", "Mayadars", "Mojan", "Moondawai", "Morjhango", "Nabisar", "Naseer Chandio", "Rahmore", "Rajari Pat", "Ranawai", "Rindki", "Sadki", "Sanwari", "Seerkhi", "Shahliwai", "Shakh Darelo", "Talhi"]
  },
  "Karachi West": {
    "Maripur": ["Allah Banoo", "Chhatara", "Gabopat", "Gond Pass", "Lalbakhar", "Maindiyari", "Mann", "Moach", "Moachko"],
    "Mangho Pir": ["Bijar Bhatti", "Bund Murad (P)", "Halkani", "Hub", "Jam Charkho", "Mai Garhi", "Manghopir", "Mukhi", "Nangan", "Surjani", "Taiser"],
    "Orangi": ["Orangi"],
    "Baldia": ["Maouch-I", "Metan"]
  },
  "Karachi East": {
    "Gulshan-e-Iqbal": ["Dozan (P)", "Gujero(P)", "Okewari", "Safooran (P)", "Songal (P)"],
    "Gulzar-e-Hijri (Scheme 33)": ["Bitti Amri", "Dozan (P)", "Gujro-1", "Songal", "Thoming"]
  },
  "Karachi Central": {
    "Liaqatabad": ["Gujhro (P)"],
    "Gulberg": ["Gujhro (P)"],
    "North Nazimabad": ["Kari Lakhi"]
  },
  "Karachi Malir": {
    "Shah Mureed": ["Allah Phihai", "Bund Murad (P)", "Loharki Long", "Mahyo", "Mandero", "Mitha ghar", "Nara thar", "Shah Mureed"],
    "Bin Qasim": ["Bakran", "Dabeji", "Dhandho", "Ghaghar", "Joreji", "Koteriro", "Pipri", "Sanhro"],
    "Ibrahim Hyderi": ["Ghangiaro", "Ibrahim Hyderi", "Khanto", "Landhi", "Rehri", "Sahrafi-II"],
    "Murad Memon": ["Bazar", "Dharano Chano", "Kankar", "Khakhar", "Kharkharo"],
    "Gadap": ["Abdar", "Amilano", "Bhad", "Boil", "Bolhari", "Chahar", "Jhanjhar", "Gadap", "Huderwah", "Jang Kurd", "Tarari", "Kand", "Karmatiain", "Kathore", "Khaar", "Khdeji", "Langheji", "Lusar", "Mehar Jabal", "Moidan", "Songal"]
  }
};

// Data for Pakistan Provinces
const pakistanProvinces = [
    { value: 'Azad Jammu & Kashmir', label: 'Azad Jammu & Kashmir' },
    { value: 'Balochistan', label: 'Balochistan' },
    { value: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan' },
    { value: 'Islamabad Capital Territory', label: 'Islamabad Capital Territory' },
    { value: 'Khyber Pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Sindh', label: 'Sindh' },
];

// EmployeeProfile component for managing employee details
const EmployeeProfile = () => {
  // State to hold all form data
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',

    // Contact Details
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    country: '',
    district: '', // New field for District
    taluka: '',   // New field for Taluka
    deh: '',      // New field for Deh (UC)

    // Employment Information
    employeeId: '',
    jobTitle: '',
    department: '',
    hireDate: '',
    salary: '',
    employmentStatus: '', // e.g., Full-time, Part-time, Contract

    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',

    // Professional Education (New Section)
    education: [
      { degree: '', institution: '', year: '', major: '' }
    ],

    // Job Related Documents (New Section - stores File objects)
    jobDocuments: [],
  });

  // State to manage form submission status and messages
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({}); // State to hold validation errors

  // State for dynamic dropdown options
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [dehs, setDehs] = useState([]);

  // Populate districts on component mount
  useEffect(() => {
    setDistricts(Object.keys(locationData).map(district => ({ value: district, label: district })));
  }, []);

  // Handle input changes dynamically for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the current field as user types
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Handle cascading dropdowns for District, Taluka, Deh
    if (name === 'district') {
      setFormData(prevData => ({ ...prevData, taluka: '', deh: '' })); // Reset Taluka and Deh
      const selectedDistrict = locationData[value];
      setTalukas(selectedDistrict ? Object.keys(selectedDistrict).map(taluka => ({ value: taluka, label: taluka })) : []);
      setDehs([]); // Clear dehs when district changes
    } else if (name === 'taluka') {
      setFormData(prevData => ({ ...prevData, deh: '' })); // Reset Deh
      const selectedDistrict = formData.district;
      const selectedTaluka = locationData[selectedDistrict] ? locationData[selectedDistrict][value] : [];
      setDehs(selectedTaluka ? selectedTaluka.map(deh => ({ value: deh, label: deh })) : []);
    }
  };

  // Handle changes for education array fields
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData(prevData => ({
      ...prevData,
      education: newEducation,
    }));
    // Clear error for the current field if it exists
    if (errors[`education[${index}].${name}`]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[`education[${index}].${name}`];
        return newErrors;
      });
    }
  };

  // Add new education entry
  const addEducation = () => {
    setFormData(prevData => ({
      ...prevData,
      education: [...prevData.education, { degree: '', institution: '', year: '', major: '' }],
    }));
  };

  // Remove education entry
  const removeEducation = (index) => {
    setFormData(prevData => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
    // Also clear any errors related to the removed education entry
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`education[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  // Handle file selection for job documents
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      setFormData(prevData => ({
        ...prevData,
        jobDocuments: [...prevData.jobDocuments, ...newFiles],
      }));
    }
  };

  // Remove a job document
  const removeJobDocument = (index) => {
    setFormData(prevData => ({
      ...prevData,
      jobDocuments: prevData.jobDocuments.filter((_, i) => i !== index),
    }));
  };

  // Basic validation function
  const validateForm = () => {
    let newErrors = {};
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone',
      'addressLine1', 'city', 'stateProvince', 'zipCode', 'country',
      'district', 'taluka', 'deh', // Added new fields to required validation
      'employeeId', 'jobTitle', 'department', 'hireDate', 'salary', 'employmentStatus',
      'emergencyContactName', 'emergencyContactPhone'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required.';
      }
    });

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Phone number format validation (simple example)
    if (formData.phone && !/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be at least 10 digits.';
    }

    // Salary must be a positive number
    if (formData.salary && (isNaN(formData.salary) || parseFloat(formData.salary) <= 0)) {
      newErrors.salary = 'Salary must be a positive number.';
    }

    // Education fields validation
    formData.education.forEach((edu, index) => {
      if (!edu.degree) newErrors[`education[${index}].degree`] = 'Degree is required.';
      if (!edu.institution) newErrors[`education[${index}].institution`] = 'Institution is required.';
      if (!edu.year) newErrors[`education[${index}].year`] = 'Year is required.';
      if (!edu.major) newErrors[`education[${index}].major`] = 'Major is required.';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status on new submission

    if (validateForm()) {
      // Simulate API call
      // In a real application, you'd likely use FormData to send files
      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
          if (key === 'jobDocuments') {
              formData.jobDocuments.forEach(file => {
                  submissionData.append('jobDocuments', file);
              });
          } else if (key === 'education') {
              submissionData.append('education', JSON.stringify(formData.education));
          } else {
              submissionData.append(key, formData[key]);
          }
      });

      console.log('Form data to be submitted:', submissionData);
      setSubmissionStatus('success');
      // e.g., fetch('/api/employees', { method: 'POST', body: submissionData })
      // .then(response => response.json())
      // .then(data => { /* handle success */ })
      // .catch(error => { /* handle error */ });
    } else {
      setSubmissionStatus('error');
      console.error('Form has validation errors:', errors);
    }
  };

  // Reusable InputField component
  const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  // Reusable SelectField component
  const SelectField = ({ label, name, value, onChange, error, options, disabled = false }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 block w-full p-3 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200 ${disabled ? 'bg-gray-200' : ''}`}
      >
        <option value="">Select...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 font-inter flex-col items-center">
      {/* Main Page Header - Using the imported Header component */}
      <Header />

      <main className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto mb-8 w-full mt-8"> {/* Added mt-8 for spacing */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Employee Profile Management</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Create or update employee's complete profile.</p>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="John"
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Doe"
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
            />
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              error={errors.gender}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <InputField
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              error={errors.nationality}
              placeholder="e.g., Pakistani"
            />
            <SelectField
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              error={errors.maritalStatus}
              options={[
                { value: 'Single', label: 'Single' },
                { value: 'Married', label: 'Married' },
                { value: 'Divorced', label: 'Divorced' },
                { value: 'Widowed', label: 'Widowed' },
              ]}
            />
          </div>

          {/* Contact Details */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john.doe@example.com"
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="03001234567"
            />
            <InputField
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              error={errors.addressLine1}
              placeholder="123 Main St"
            />
            <InputField
              label="Address Line 2 (Optional)"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apt 4B"
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="Karachi"
            />
            <SelectField
              label="State/Province"
              name="stateProvince"
              value={formData.stateProvince}
              onChange={handleChange}
              error={errors.stateProvince}
              options={pakistanProvinces}
            />
            <InputField
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
              placeholder="75210"
            />
            <InputField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
              placeholder="Pakistan"
            />
            {/* New Domicile Dropdowns */}
            <SelectField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              error={errors.district}
              options={districts}
            />
            <SelectField
              label="Taluka (Tehsil)"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              error={errors.taluka}
              options={talukas}
              disabled={!formData.district} // Disable until a district is selected
            />
            <SelectField
              label="Deh (UC)"
              name="deh"
              value={formData.deh}
              onChange={handleChange}
              error={errors.deh}
              options={dehs}
              disabled={!formData.taluka} // Disable until a taluka is selected
            />
          </div>

          {/* Employment Information */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Employment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6">
            <InputField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              error={errors.employeeId}
              placeholder="EMP001"
            />
            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
              placeholder="Software Engineer"
            />
            <InputField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={errors.department}
              placeholder="Engineering"
            />
            <InputField
              label="Hire Date"
              name="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={handleChange}
              error={errors.hireDate}
            />
            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              placeholder="150000"
            />
            <SelectField
              label="Employment Status"
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              error={errors.employmentStatus}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Intern', label: 'Intern' },
              ]}
            />
          </div>

          {/* Professional Education */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Professional Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4 p-4 border border-gray-200 rounded-lg relative">
              <h3 className="text-lg font-medium text-gray-700 col-span-full mb-2">Education Entry #{index + 1}</h3>
              <InputField
                label="Degree/Qualification"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education[${index}].degree`]}
                placeholder="e.g., Master of Science"
              />
              <InputField
                label="Institution"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education[${index}].institution`]}
                placeholder="e.g., University of California"
              />
              <InputField
                label="Year of Graduation"
                name="year"
                type="number"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education[${index}].year`]}
                placeholder="2020"
              />
              <InputField
                label="Major/Field of Study"
                name="major"
                value={edu.major}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education[${index}].major`]}
                placeholder="e.g., Computer Science"
              />
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                  title="Remove education entry"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Education
          </button>

          {/* Emergency Contact */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6">
            <InputField
              label="Full Name"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              error={errors.emergencyContactName}
              placeholder="Jane Doe"
            />
            <InputField
              label="Relationship"
              name="emergencyContactRelationship"
              value={formData.emergencyContactRelationship}
              onChange={handleChange}
              error={errors.emergencyContactRelationship}
              placeholder="Spouse"
            />
            <InputField
              label="Phone Number"
              name="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              error={errors.emergencyContactPhone}
              placeholder="03111234567"
            />
          </div>

          {/* Job Related Documents */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Job Related Documents</h2>
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex flex-col items-start gap-4">
                <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Select Documents
                </label>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden" // Hide the default ugly input
                />
            </div>
            {formData.jobDocuments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Selected Documents:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {formData.jobDocuments.map((doc, index) => (
                    <li key={index} className="flex justify-between items-center text-gray-800 bg-gray-100 p-2 rounded-md">
                      <span>{doc.name} ({Math.round(doc.size / 1024)} KB)</span>
                      <button
                        type="button"
                        onClick={() => removeJobDocument(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-bold ml-4"
                        title="Remove"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submission Button and Status Messages */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Profile
            </button>

            {submissionStatus === 'success' && (
              <p className="mt-4 text-green-600 font-semibold">Profile saved successfully!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="mt-4 text-red-600 font-semibold">Please correct the errors in the form.</p>
            )}
          </div>
        </form>
      </main>

      <footer className="text-center text-gray-500 text-sm mt-8 pb-4">
        <p>&copy; 2025 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployeeProfile;

// import React, { useState, useEffect } from 'react';

// // Data extracted from the PDF for Districts, Talukas, and Dehs (UCs)
// const locationData = {
//   "Badin": {
//     "Badin": ["Abri", "Achh", "Achhro", "Akro", "Aminariro", "Andhalo", "Angri", "Babralo-under sea", "Badin", "Baghar", "Bagreji", "Bakho Khudi", "Bandho", "Bano", "Behdmi", "Bhambhki", "Bhaneri", "Bidhadi", "Bijoriro", "Bokhi", "Booharki", "Borandi", "Buxa", "Chandhadi", "Chanesri", "Charo", "Cheerandi", "Chhel", "Chobandi", "Chorhadi", "Chorhalo", "Daleji", "Dandhi", "Daphri", "Dasti", "Dhandh", "Dharan", "Dheenghar", "Doonghadi", "Gabarlo", "Gad", "Gagro", "Ghurbi", "Githo", "Gujjo", "Gurho", "Jakhralo", "Jakhri", "janath", "Janjhli", "Janki", "Jhagri", "Jhalar", "Jhol khasi", "Jhurkandi", "Kadhan", "Kadi kazia", "Kahlifa", "Kak", "Kalhori", "Kamaro", "Kand", "Kandri", "Karabhari", "Keerandi", "Khakhar", "Khalso", "Khambro", "Kheerdahi", "Khudi", "Khurhadi", "Khuro", "Kumbhariro", "Kunar", "Lohan", "Lao", "Lareri", "Loon Khan", "Luari Sharif", "Lundo", "Majja Basri", "Makhandi", "Makra", "Malki", "Marai", "Mard", "Markhan", "Mirzapur", "Mithi", "Mithi-2", "Mithi-3", "More", "Moreri", "Morhadi", "Moro", "Nangarkhet", "Nangro", "Nareri", "Nindo Shaher", "Odha", "Ojhri", "Padhar", "Pado", "Pahori", "Pakhothar", "Palh", "Panchi", "Panhwarki", "Pano", "Pano Baeed", "Pano Baqir", "Pano Lundki", "Pano Mir Khan", "Patar", "Pateji", "Patiari", "Qaimpur", "Rat", "Roonghadi", "Sando", "Sanghar", "Sanjra", "Sarahadi", "Saroro", "Seerani", "Senghari", "Setha", "Sheikhpur", "Sialki", "Siantri", "Siarsi", "Sonhar", "Sutiari", "Tali", "Thath", "Vidhri", "Wagodaho", "Wahryaro", "Waldhari", "Wararki", "Waryaro", "Waryaso"],
//     "Matli": ["Aghamano", "Ali pur", "Amarlo", "Arain", "Bambhnai", "Baran", "Barasar", "Bediro", "Bhadari", "Buhro Jagir", "Buhro Rayati", "Chakra", "Chan Ganga", "Chansonrani", "Chan-sorahadi", "Chaogazo", "Choretani", "Dasti", "Dadhar", "Dakaro", "Dariri", "Daro sendi", "Deero muhabat", "Dembyari", "Dhabhi", "Dilo-dero", "Diyal", "Doomani", "Dumbalo", "Gari Bhri", "Ghari Lundi", "Gharo", "Gharo Sarmast", "Gopalo", "Gorano", "Gujo", "H.karam ali", "Hanjar", "Jarki", "Jehajani", "Juneja", "Kalwari", "Kandrahki", "Kangni", "Kanheri", "Kari Muhammad Ali", "Kari sain Dad", "Kariyano", "Kathore", "Keenjhar", "Khaberlo", "Khachar", "Khad Khuhi", "Khairwah", "Khareri", "Khari", "Khariyon", "Khathore", "Khori", "Khudi", "Labni", "Lakhadi", "Lanyari", "Lorer", "Lundano", "Maban", "Malhan", "Mangria", "Matli", "More", "Morhadi", "Nathu", "Pabni", "Padhar", "Paee", "Paniro", "Panjm Hisso", "Phulejani", "Rain", "Rohiro", "Sando", "Saonro", "Sehrat", "Senhor", "Sikni", "Sita", "Sore", "Sorhadi", "Sun", "T.G Ali", "Talho", "Talhyari", "Tali", "Thari", "Udhejani", "Vee", "Waghrayi", "Wanji"],
//     "S.F.Rahu": ["Agri", "Ahmed rajo-1", "Ahmed rajo-2", "Ahmed rajo-3", "Ahmed rajo-4", "Ahmed rajo-5", "Ahmed rajo-6", "Akai", "Akri Jagir", "Akri-1", "Akri-2", "Aseli", "Bari", "Barodari", "Bukerani", "Cahkari", "Chachh", "Dadharko", "Dandho", "Dasarki", "Dubi", "Fatehpur", "Ghanwarah", "Gharo", "Girhari-1", "Girhari-2", "Girhari-3", "Girhari-4", "Girhari-5", "Githo", "Golarchi", "Gujhari", "Jakheji-1&2", "Jhabiro", "Jhol", "Jhol-2", "Jhole-1", "Jhole-3", "Jhole-4", "Jhole-5", "Jhole-6", "Kadh", "Kaheki", "Kakejani", "Kand", "Kandeyari", "Kario-1,2", "Kathar", "Kharch", "Khareyoon", "kharoDabo", "Khebrani", "Kheeryoon", "Khero Bhataro", "khersari", "Khorwah", "Khudh", "Kinder Jageer", "Koryani", "lakhi", "Lakri", "lashkarnani", "Lorhad", "Malira", "Mariwasayo 2", "Mariwasayo-1", "Maroo jat", "Minyoon", "Mitho Dabo", "Miyano Karrath", "Mukhdoompur", "Mulki", "Narri", "Narbut", "Nohiki", "Nukarji-1", "Nuqarji-2", "Odherki", "Padheryoon", "Patihal", "Phitoon", "Rahuki", "Rari-1", "Rari-2", "Rari-3", "Rari-4", "Rari-5", "Rip", "Saleh abad", "Samki", "Shekhano", "Sodhki", "Sorhadi", "Suteyari", "Tajhedi", "Tarai", "Walhar"],
//     "Talhar": ["Bagerki", "Baghlani", "Bhetaro", "Bohrro I", "Bohrro II", "Bohrro III", "Bohrro IV", "Chachari", "Channeri", "Chick", "Dabgro", "Dabhrro", "Dato Jamali", "Daurung", "Dedki", "Doro Nero", "Dourmano", "Gaheki", "Golarri", "Gonho", "Kanderi", "Khanoat", "Kocho Sajan Sawai", "Kohar", "Koteri", "Lundki", "More", "Morjhar", "Mughal Hafiz", "Munahaiki", "Nar", "Nawabed", "Paathroon", "Perharki", "Phosana", "Phulhadion", "Raheji", "Rembhan", "Rip", "Rojherlei", "Saeed Pur", "Sajan", "Sajan pur", "Sandhki", "Sausi", "Seri", "Shakani", "Shorki", "Talhar", "Vassarki", "Vidh", "Walhar", "Wasi Adil", "Wasi Sajjan"],
//     "Tando Bago": ["Adori", "Ahmedani", "Akore", "Ali abad", "Amar Nar", "Aqil", "Bagh Shahmir", "Banghar", "Baxo Kaloi", "Beero Weran", "Belaro", "Bhryoon", "Bohri", "Chandheli-1", "Chandheli-11", "Chandheli-111", "Changho", "Char", "Charvo", "Chavra", "Chhabralo", "Chhachh", "Chhan", "Choubandi", "Dadah", "Dambharlo", "Dando", "Dei", "Dei jarkas", "Dhanjol", "Dhoro Kaka Noro", "Dhubni", "Digh", "Domhar", "Duz", "Fateh Pur", "Fato Qambrani", "Gad", "Gaheji", "Girathri", "Gujo", "Hajar Hadi", "Hameera", "Har", "Higorjani", "Hothair", "Jal Mori", "Jesar", "Kahdharo", "Kak-1", "Kak-11", "Kak-111", "Kamaro", "Kang", "Kangpir", "Kapoori", "Kariyano", "Katadaho", "Katal", "Khadi Adat", "Khado", "Khahi Beero", "Khairpur", "Khalso", "Khanah", "Khari Khabarlo", "Kheerdahi", "Kherol", "Khoro", "Khoski", "Khureri", "Korahi", "Liar", "Machandi", "Machori", "Mato", "Mena", "Mesadi", "Mohna", "Morahadi", "Moro", "Motna", "Oil Pur", "Panu Nau", "Pharho", "Phull", "Phyari", "Pir Misri", "Piror", "Potho", "Potho Nar", "Rail Tarai", "Rajori-1", "Rajori-111", "Ropari", "Saddiq", "Sangi", "Senhaho", "Sonhar", "Sonhari", "Tando Bago", "Tayab Sehto", "Thorki", "Thorlo", "Thui", "Tori", "Toryano", "Uanrki", "Vee Bahadur", "Waghdahi"]
//   },
//   "Dadu": {
//     "Dadu": ["Aminiani", "Badani", "Baghban", "Bakhrani", "Belo Choi", "Bhand", "Buth Malho", "Buthi", "Chanrath Jagir", "Chanrath Rayaeti", "Choi", "Dadu", "Dawichh", "Dhoro Damrio", "Duabo", "Dubi jagir", "Dubi Rayeti", "Ghallo", "Jakhpari", "Juberji", "Jung", "Kalhora", "Kandi", "Katcho Chanrath", "Katcho Kharero", "Katcho Nasrani", "Katcho Pumbi", "Katcho Purano Dero", "Katcho Rap", "Katcho Sita", "Keenjhar", "Khariro", "Khasa chandia", "Khero", "Khudabad Jagir", "Khudabad Rayaeti", "Khushik", "Koorpur", "Makhdoom Sahib", "Malkani", "Markhpur", "Marvi", "Moundar", "Nasrani", "Naulakho", "Noorja", "Pacco Sita", "Palha", "Pat", "Phaka", "Piperpanjan", "Pipri", "Pir gunio", "Pir Tarho Jagir", "Pir Tarho Rayeti", "Pumbi", "Purano Dero", "Rap", "Samheen", "Shahani", "Sial", "Sidhwah", "Sonnhion jagir", "Soonhion Rayeti", "Sutcharo", "Taga", "Warayaso"],
//     "Johi": ["Abad", "Allah Yar Dero", "Angi", "Aroni", "Arraro", "Baghari", "Bahwalpur", "Bakhar Shaheed", "Beer Bughio", "Bhashim Faqeer", "Bhlali Shah", "Bueer", "Buthi", "Chakar Kot", "Channa", "Chinni", "Cookrani", "Dabhari", "Dara Machhi", "Daubo", "Dhonk", "Din Panah", "Dohari Kunari", "Drigh Bala", "Drigh Henthi", "Fhero Dero", "Gahi Charo", "Gaji Khan", "Ghaha", "Gorandi", "Hairo Khan", "Haji Khan", "Hali Jo", "Hassnani", "Jalab", "Jampur Landki", "Jampur Panwarki", "Jhalko", "Johi", "Kathya Barani", "Keti Nai", "Khan Wah", "Khandhani", "Kharach", "Khat", "Khooh Mano", "Koor Kalan", "Koor Phajo", "Koorja Mikk", "Kot Bajo", "Lalhar", "Landho Dero", "Lohri", "Machoko", "Main-Ji-Kandi", "Makhan Belo", "Malhar Barani", "Malko Jagir", "Masoo Dero", "Mir Wah", "Mirani Mchhi", "Mothri", "Mureed Dero", "Nai Taki", "Naichki", "Nali", "Naushahro", "Noonari", "Nooro", "Pahore", "Pai", "Pat Gul Mohammad", "Pat Khanhari", "Pat Suleman-1", "Pat Suleman-2", "Pat Suleman-3", "Pat Suleman-4", "Patro-1", "Patro-2", "Patro-3", "Peer Dohari", "Phadak", "Phulji jagir", "Phulji Rati", "Pir Gaji shah", "Potho", "Qasbo", "Qubo Qalandar-1", "Qubo Qalandar-2", "Rajo Dero", "Sakaro", "Sakir Hali Jo", "Saranjhari", "Sawaro", "Shah Hassan", "Shahdman", "Shahmorio", "Shori Jagir", "Sole Jagir", "Suk Nai", "Thariri Jado Shaheed", "Thull", "Tok Qasim", "Tore", "Tori", "Tori-1", "Tori-2", "Vigji Jgir", "Vigji Rati", "Wahi Pandhi"],
//     "Khairpur Nathan Shah": ["Abad Jagir", "Ahori Jagir", "Ahori Rayati", "Akhir Nari", "Bahadurpur", "Baid", "Baledera Jagir", "Baledera Rayati", "Banbhinyoon", "Bawan", "Bego dero", "Bhagna", "Bhangar", "Bori no.1", "Bori no.2", "Borriri", "Bugg", "Burrira Jagir", "Burrira Rayati", "Buttra", "Chhandan", "Chija pur Jagir", "Chija pur rayati", "Chow Khandi", "Dangar", "Dhingano", "Dogar", "Drib Toolan", "Dur mohammad", "Fateh Pur", "Fekhirato", "Gabariji", "Gachal", "Gadhi", "Gharo", "Ghija pur Jagir", "Ghija pur rayati", "Gozo", "Isso Machi", "Isso Narejo jagir", "Isso narejo Rayati", "Jakhiro", "Kakar", "Kande chukhi", "Kario Ghulam-ullah", "Kario Mitho Zangejo Jagir", "Kario Mitho Zangejo Rayati", "Khadhar", "Khairpur Jagir", "Khanbhan Nangin", "Khanpur", "Khariro kinaro", "Khat Lashikar", "Khathri", "Khurbi No.1", "Khurbi No.2", "Kooh Misri", "Koor budho", "Koor Hussain", "Kurkut Jagir", "Kurkut rayati", "Ladho Dero", "Mado Jagir", "Mado Rayati", "Maha", "Makhi Servey", "Makhi Unsurvey", "Malam No.1", "Malam No.2", "Mari", "Mir Mohammad", "Miro Kalhoro", "Pai", "Pai jaho", "Pusia", "Qamber Jagir", "Qamber Rayati", "Qomicharo", "Rahuja", "Rap", "Rap Kainchi", "Redhi Servey", "Redhi Unservey", "Salari No.1", "Salari No.2", "Salari No.3", "Salari No.4", "Salari No.5", "Seer Abad", "Sheeh werho", "Sukhapur", "Thalho", "Vaiji", "Wasai"],
//     "Mehar": ["Abad-1", "Abad-11", "Anbar", "Bachi Jagir", "Bachi Rayeti", "Baledai", "Balko", "Band Gahi", "Belo Bhorti", "Belo Sona Bindi", "Betto", "Bhand Mari", "Bhorti-11", "Bhutto", "Bisharat katchri", "Bothro", "Butt Serai", "Charo", "Chhalo", "Dadh Barani", "Dadhar", "Dakhani", "Durbo", "Faridabad", "Faridabad Barani", "Gahi Maheasr", "Ganja Thorha", "Garkan", "Ghari Jageer", "Ghari rayeti", "Goongo", "Gul Mohd Wah", "Gunhero", "Humbar", "Kamalpur", "Kamangar", "Kandhra", "Kario Qasim Shah", "Kaseero", "Kawanjhro", "Keriro", "Khondi", "Kinaro Kakol", "Kolachi", "Kothi Khokhar", "Kothi Sodhari", "Kundan", "Lakhyari", "Laloo Ghari", "Langhano", "Litan", "Magsi", "Mangwani", "Manjan", "Mojhar Barani", "Mureed Lakhiar", "Nari", "Nasoi", "Nath", "Naun Goth", "Neerah", "Pat Kandi", "Pateji", "Peroz Shah", "Pipri", "Poarcho", "Radhan", "Rap Nari", "Reo Katcho", "Rojhan", "Roni", "Sadhar Aliwal", "Saeedpur", "Seri", "Shah Panjo", "Thariri Muhabat", "Umedero", "Ustelo", "Wah Gahi", "Waryaso"]
//   },
//   "Ghotki": {
//     "Ghotki": ["Adilpur", "Amirabad", "Attal Muradani", "Bago Daho", "Bandh", "Baqro", "Behishti", "Belo Gublo", "Belo Jamshero", "Belo Sangri", "Beriri", "Bhanjro", "Bhiryalo", "Bhityoon", "Changlani", "Dari", "Dhamaji", "Doomano", "Drago", "Dring Chachhar", "Erazi", "Esa Wali", "Fazal Bhayo", "Hakra", "Hamro", "Hussain Beli", "Jahanpur", "Jamal", "Janghiari", "Katcho Bahab", "Katcho Bindi", "Katcho Miranpur", "Katcho Tibi", "Katco Buxo Ghoto", "Khadwari", "Khahi Daro", "Kham", "Khuhara", "Kotlo Bullo", "Labana", "Lakhan", "Laloowali", "Maka", "Malhir", "Malook Wali", "Mathelo", "Miyani", "Moto Mahar", "Muhammad Pur", "Odharwali", "Pacco Bahab", "Pacco Bindi", "Pacco Buxo Ghoto", "Pacco Miranpur", "Pacco Tibi", "Pano Khalso", "Phekrato", "Qadirpur", "Qaloo Malhan", "Qazi Wahan", "Ruk", "Saleh Mahar", "Sangi Ghotki", "Sangri", "Sarhad", "Satabo Bhayo", "Shafiabad", "Shaikhani", "Suhriani", "Sundrani", "Thatho Malhan", "Vidhur", "Wad Pagiya", "Wagni", "Wasayo Chachar", "Wasti Inayat Shah", "Wasti Q.Din Shah"],
//     "Daharki": ["Alamarain", "Bago Daro", "Belo Berutta", "Berutta", "Chacharki", "Chanad", "Chhoranwalo", "Daharki", "Derawaro", "Dhandh Raharki", "Goi", "Gorhelo", "Gulo Pitafi", "Hamidpur", "Hiko", "Ibrahim Pitafi", "Jado Pitafi", "Jampur", "Jhanwar", "Jhum", "Jung", "Kalwar", "Katta", "Khenjho", "Kherohi", "Khushkh", "Kotlo", "Lal Pitafi", "Looni", "Maringaro", "Mirzapur", "Poh No1", "Poh No2", "Raharki", "Rail", "Raini", "Sain Dino Malik", "Sanilo", "Sanko", "Sejan", "Shahbazpur", "Simno", "Sutiayaro No5", "Sutiyaro Chak No1", "Sutiyaro Chak No2", "Takio M.Pannah", "Vijnoth", "Wahi Gul Khan"],
//     "Khan Garh": ["Aithi", "Ali Mahar", "Ari Mahar", "Bambli", "Bandwari", "Bari", "Bhetoor", "Bhitoin", "Chak Qazi Badal", "Chhanwani", "Dakhano", "Ibrahim Mahar", "Izat Wari", "Kandlo", "Khabar Chachar", "Khangarh", "Khanpur", "Lakho Mahar", "Lohi", "Makahi", "Mithri", "Naro", "Pathan Mahar", "Phul Daho", "Qazi Badal", "Raanyar", "Sahta", "Samo Wah", "Sanharo", "Shahpur", "Sutiaro No:1", "Sutiaro No:3", "Tarai", "Wahi Dhano", "Waloo Mahar", "Walrah", "Warwaro"],
//     "Mirpur Matelo": ["Akhtiar Waseer", "Alim Khan Gadani", "Baloch Khan", "Barar", "Bel Mirpur", "Bel0 Waseer", "Belo Bozdar", "Bhiri Laghari", "Chijjan", "Damanon", "Darwesh Naich", "Dhangro", "Dil Muard Gabole", "Dino Mako", "Drib Dethri", "Fatehpur", "Gahno lund", "Gaji Gadani", "Garhi Chakar", "Gendaro", "Gurkan", "Haj Korai", "Hamind Korai", "Hayat Pitafi", "Ismail Bozdar", "Jahan Khan Unar", "Jarwar", "Jhangan", "Jindo Pitafi", "Kander", "Karampur", "Khansar", "Khu Meenhon", "Khui Khengi", "Lashkri Lund", "Latif Shah", "Machalo", "Malnas", "Meroja", "Mirpur", "Mitho Lund", "Nhundri", "Pipri", "Sabar Bozdar", "Saeed Khan Chandio", "Sahib Khan Lund", "Shekhan Wari", "Sher Ali Gabole", "Sher Khan Bozdar", "Sher Khan Kolachi", "Sobho Lund", "Sono Pitafi", "Suhanjro", "Sutyaro 1", "Sutyaro 4", "Tahir Gadani", "Wah Bakro", "Wahi Ghoto", "Wahi Mubarak", "Yaro Lund"],
//     "Ubauro": ["B.Rano Rahar", "Band", "Bapar", "Belo Rawanti", "Bindi adam", "Bindo A.Sattar", "Bori", "Chanali", "Chandia", "Chatu Daho", "Dabli", "Daulatpur", "Daveri", "Detha Bhaya", "Dilwaro", "Dub", "Garang", "Ghundi", "Girkno", "Gohram chachar", "Goongo daho", "Islam Lashari", "Jhangal Dawo", "Jhangal malik", "Kalwli", "Kamo Shaheed", "Katcho miani malook", "Keenjhar", "Khambhra", "Khamiso Chachar", "Koraiki", "Kotlo kamil", "Kotlo Yousuf", "Kubhur", "Kundri Walo", "Langho", "Larh nabo", "Likhpur", "Lundo", "Madan Walo", "Mari", "Maroowalo", "Matar Kot", "Muhammad Pur", "Muradpur", "Naseer dhandu", "Nurley", "Pako miani malook", "Pir Bux", "Rajanpur", "Rano Rahar", "Rawanti", "Reti", "Rind", "Sayed Pur", "Shadi walo", "Shahwali", "Shams chapri", "Shewani", "Soi Sharef", "Sonan", "Tig", "Ubauro", "W.J Shah", "Warwalo"]
//   },
//   "Hyderabad": {
//     "Hyderabad": ["Abri", "Agheemani", "Almani", "Alni", "Amilpur", "Barechani", "Barham", "Bhido Jagar", "Bhindo Rayati", "Bhinpur", "Bilori", "Bohiki", "Boochki Jagir", "Boochki Rayati", "Buxo laghari", "Chacha Detha", "Chukhi", "Dachrapur", "Dali Nandi", "Dali Wadi", "Damanchani Rayati", "Dhamanchani Jagir", "Ghaliyoon", "Ghotana", "Gujjan", "Gul Mohd Thoro", "Halepota", "Hatri", "Hotki", "Hussain Khan Thoro", "Kajhur", "Kathri", "Kathro", "Khanpota", "Khunjejani", "Kunner", "Lashari", "Liyar Jagir", "Mati", "Miyano", "Moharo", "Moolan", "Mori Jagir", "Mori Rayati", "Mulki", "Narejani", "Noorai Jagir", "Noorai Rayati", "Panhwari", "Pasaikhi", "Patbhari", "Patoro", "Raees", "Rahooki", "Rajpari", "Rukanpur", "Sahita", "Sanhwar", "Seri Jagir", "Seri Rayati", "Sipki Jagir", "Sipki Rayati", "Sukhpur", "Takio Jeewan Shah Jagir", "Takio Jeewan Shah Rayati", "Tando Fazal", "Tando Qaiser", "Thaheem", "Theba", "Widh"],
//     "Qasimabad": ["Jamshoro", "Mirzapur", "Sari", "Shah Bukhari"],
//     "Latifabad": ["Bora reyati", "Ganjo Takar", "Giddu Bandar", "Goondar", "Khater", "Lakhi Keti", "Malh", "Mehrani", "Met Khan", "Nareja"],
//     "Hyderabad City": ["Foujgah", "Ghanghra", "Gujjo", "Hyderabad"]
//   },
//   "Jacobabad": {
//     "Jacobabad": ["Abad", "Abdullah Dakhan", "Ahmedpur", "Akilpur", "Alipur", "Attai", "Bachal Pur", "Badal Wah", "Bajhani", "Baqapur", "Bello Alipur", "Bello Dixon", "Bhalidino", "Burj Selemi", "Chajjra", "Chawani", "Dadh", "Dadpur", "Dasti", "Detha", "Dilawarpur", "Fatehpur", "Garhi Chand", "Garhi Mehrab", "Ghouspur", "Hambhi", "Jacobabad", "Janidero", "Khairwah", "Khaloolabad", "Koureja", "Lal Lodro", "Malhooabad", "Mehar Shah", "Mehrabpur", "Milkiat Sarkar", "Moulabad", "Moulan Rato", "Mundranipur", "Nawara", "Nawazo", "Orangabad", "Phatanwah", "Pir Padhro", "Qadirpur", "Qaiasrabad", "Rahimabad", "Ramzanpur", "Retti", "Rindwahi", "Shahdadpur", "Shahpur", "Sheeradabad", "Soomanpur", "Thariri Bhalidino", "Umaranipur", "Wakro", "Waryamabad"],
//     "Thul": ["Abdullah Jakhrani", "Ali Khan", "Allagh Yar", "Athri", "Bachro", "Bahadurpur", "Bakhtiarpur", "Balochabad", "Bamble", "Barri", "Bhanger", "Bitti", "Bolaki", "Burira", "Chandan", "Channa", "Daho", "Dakhan", "Daro Mukh", "Deen Garh", "Dhani Bux", "Dil Murad", "Dool", "Dubi", "Fateh Khan Sabayo", "Ganji", "Garhi Hassan", "Garhi Rahimabad", "Ghulamoon", "Ghunia", "Girkano", "Gola", "Gujo", "Hairo", "Hambi", "Hotewah", "Hyderpur", "Jalal Pur", "Jariyoon", "Jhangiwah", "Joungal", "Kanrani", "Karim Abad", "Karim Bux", "Katta", "Khatan", "Khosa", "Khuda Bux", "Korar", "Kot Gul Muhammad", "Kot Jangu", "Lado", "Logi", "Loi", "Madad Khoso", "Maloi", "Mehar Ali", "Mehrabpur", "Miral Nau", "Miral Purano", "Mirpur", "Mirsipur", "Mitho Thariri", "Moosa Wah", "Mubarak Pur", "Muhib Wah", "Nagan", "Nau Wah", "Odhano", "Pako", "Panah Abaad", "Phul", "Purano Wah", "Qalendarpur", "Rahim Abad", "Ranjhapur", "Rap Muard", "Rato Thariri", "Sajin Wah", "Sameja", "Sarki", "Sher Wah", "Shujra", "Tajo Khoso", "Talib Shah", "Tanwari", "Thariri", "Thul Nau", "Thul Purano", "Toj", "Udi", "Wah Mistri", "Zangipur"],
//     "Garhi Khairo": ["Abdullah Mahesar", "Allah Pur", "Allahabad", "Amir Abad", "Azmat Abad", "Baharo Khokhar", "Budho", "Daro Jeeand", "Datirdino Mahesar", "Dital Wah", "Doda Pur", "Drib Morayo", "Dunya Pur`", "Garhi Khairo", "Ghouse Abad", "Gokal Pur", "Gul Wah", "Hazar WAH", "Jafar Abad", "Jahan Pur", "Jalbani", "Jamal Abad", "Jeeand", "Khairo", "Khan Wah", "Khand", "Khanpur", "Khuda Abad", "Kitch", "Kohari", "Koor Beero", "Koor Khairo Gachal", "Koor Rato", "Kotari", "Kote Ali Nawaz", "Lal Odho", "Lal Wah", "Lund", "Mairee", "Miranpur", "Muarad Ali", "Muhammad Pur", "Nao Wah", "Nazimabad", "Pir Bux", "Punhoon Bhatti", "Qeemat Abad", "Rasol Abad", "Saleh", "Sawan Lashari", "Shah Bazi Mahar", "Shaheed", "Sher Khan", "Sheran Pur", "Sone Wah", "Sultanpur", "Tajo Dero", "Thariri", "Wah Ali Hyder", "Wasayo"]
//   },
//   "Jamshoro": {
//     "Kotri": ["Andhi-Je-Kasi", "Bada Jaghir", "Bada Rayati", "Belo Gugh", "Chhib", "Dabhon", "Kandh Wingo", "Karo-Khoho", "Khanpur", "Kotri", "Manjho Jagir", "Manjho Rayti", "Morho Jabal", "Mulas", "Nadhi Buhni", "Petaro Jagir", "Petaro Rayati", "Rahir", "Railo", "Saloi", "Sonwalhar", "Tango", "Tarband", "Ukhri Kass", "Vee", "Wagan Wari"],
//     "Manjhand": ["Abad", "Amri", "Badhpur", "Belo Unerpur", "Bhacha", "Bhadar", "Bhambhara", "Bhiyan", "Bhorawah", "Bug", "Butho", "Chachhar", "Dabhi", "Dabhri", "Dumb", "Elchi", "Gaincha", "Givari", "Gor Had", "Jhalo", "Kachi", "Kandher", "Karahi", "Kastor", "Khakoor", "Khasai", "Kheraji", "Khuman", "Korejani", "Kubi", "Kun", "Lakha", "Lakhri", "Laki", "Lellan", "Manjhand", "Meeting", "Nea Jetharo", "Noorpur", "Ocho", "Rajri", "Rio Katcho Unerpur", "Sann", "Shoorki", "Tangyani", "Thatti", "Thebat", "Unerpur", "Wachharo", "Wadi Behani"],
//     "Sehwan": ["Abad", "Akri Jageer", "Akri Rayati", "Aktar", "Arazi", "Arbi", "Bado Jabal", "Bagh Yousif", "Baid", "Bajara", "Barki", "Bhambha", "Bhan", "Bhootra", "Bhundhri", "Bilawalpur", "Bilhan", "Bilhni", "Bubuk", "Bukhtiar Pur", "Channa", "Chhachh", "Chorlo", "Dal", "Dalh", "Dhandh-Karampur", "Duri Dero Jageer", "Duri Dero Rayati", "Fazlani", "Gahir", "Gumrachh", "Jafferabad", "Jaheja", "Jatoi", "Jhandiani", "Jhangara", "Kachhi", "Kai", "Kalo Bhori", "Kandi Jabal", "Karampur", "Karyani", "Khabroth Jageer", "Khabroth Rayati", "Khero Dero", "Kot Barocho", "Lashari", "Maheji", "Miliriri", "Munh-Mukhri", "Naing", "Narpirari", "Nighawal", "Peer Hassan", "Radhok", "Rohri", "Saeedabad", "Sehwan", "Shah Gorch", "Shaikh", "Sultanpur", "Super", "Talabad Jabal", "Talti", "Tando Shahbazi", "Tehni", "Therhi Jageer", "Therhi Rayati", "Wahur", "Wanchha", "Yakubani"],
//     "Thano Bula Khan": ["Babar Band", "Bachani", "Batharo-Karchat", "Beli Thap", "Bhall", "Desvi", "Dhamach", "Ghanghiaro", "Hathal Buth", "Kalo Khohar", "Kande-Tarai", "Kapat", "Khajoor", "Koh-Tarash", "Loyachh-Doda Khan", "Loyachh-Sardar Khan", "Mole", "Pat-Karchat", "Pokhan", "Rani Kot", "Rek", "Sari", "Tak Makan", "Thando Arab Khan", "Tiko Baran", "Toung", "Uth Palan", "Wahi Arab khan"]
//   },
//   "Kamber Shahdadkot": {
//     "Kamber": ["Abri", "Acha", "Aheer", "Bagh Jagir", "Bagodero", "Ber", "Bhada", "Bhangar Acha", "Bharmi", "Bhola Kalhora", "Boohar", "Chacha", "Chajjra", "Changro", "Dera", "Dhero", "Dost Ali", "Drib Mitho", "Duwabo", "Elchi", "Esso", "F.M Siyal", "Fatoohal Wah", "Ghathar", "Ghogharo", "Hani", "Hasula", "Hulia", "Jagir No 3", "Jagir No.6 Chak No. 10", "Jagir No.6 Chak No. 11", "Jagir No.6 Chak No. 12", "Jagir No.6 Chak No. 13", "Jagir No.6 Chak No. 14", "Jagir No.6 Chak No. 15", "Jagir No.6 Chak No. 16", "Jagir No.6 Chak No. 17", "Jagir No.6 Chak No. 18", "Jagir No.6 Chak No. 19", "Jagir No.6 Chak No. 2", "Jagir No.6 Chak No. 20", "Jagir No.6 Chak No. 21", "Jagir No.6 Chak No. 22", "Jagir No.6 Chak No. 23", "Jagir No.6 Chak No. 24", "Jagir No.6 Chak No. 25", "Jagir No.6 Chak No. 26", "Jagir No.6 Chak No. 27", "Jagir No.6 Chak No. 28", "Jagir No.6 Chak No. 29", "Jagir No.6 Chak No. 3", "Jagir No.6 Chak No. 30", "Jagir No.6 Chak No. 31", "Jagir No.6 Chak No. 32", "Jagir No.6 Chak No. 33", "Jagir No.6 Chak No. 34", "Jagir No.6 Chak No. 35", "Jagir No.6 Chak No. 36", "Jagir No.6 Chak No. 37", "Jagir No.6 Chak No. 4", "Jagir No.6 Chak No. 5", "Jagir No.6 Chak No. 6", "Jagir No.6 Chak No. 7", "Jagir No.6 Chak No. 8", "Jagir No.6 Chak No. 9", "Jagir No1", "Jagir NO2", "Jagir No-4", "Jagir No-5", "Jagir No6", "Jian Abro", "Juneja", "Kalar", "Kamal Khan", "Kamber", "Kanwar`", "Kario Murad Ali", "Karohar", "Khabiriro", "Khahi Meehoon", "Khairpur Jusso", "Kohistan", "Koor Hassan", "Koor Kamal", "Koor Suleman", "Lakha", "Lakhtiya", "Lashkari Chandio", "Mahyoon", "Mena", "Mohabat Buledi", "Nangar Hakro", "Nathar", "Nouzman", "Pakho", "Panhwaro", "Peroz Bhatti", "Potho Ibrahim", "Puna", "Ranwati", "Rato Kot", "Sharifani", "Wadha", "Wakro", "Waryaso"],
//     "Miro Khan": ["Ali sher Gopang", "Allah Bad", "Allah bux wadho", "Allah Rakhio", "Behram Hethyoon", "Behram Mathyon", "Bharmi", "Buthi", "Cheelo", "Chhajri", "Chori", "Chutto joyo", "Dhori Mubarak", "Dhori pir bux", "Dingri", "Drib chandio", "Golo Khuhawar", "Jalal", "Kalhora", "Kallar daro Muqam", "Karam ali gopang", "Karera", "Kario Jam", "Khudi", "Koor ali khan", "Koor Ibarahim", "Koor Ismail", "Koor Muhbbat", "Mahmoon", "Misri khan Chandio", "Pholro", "Qaim gopang", "Rap", "Shah Ali Tunio", "Thareri Dhap", "Tharo wadho", "Thull", "Vee"],
//     "Nasirabad": ["Adi Dhamrah", "Adi Lashari", "Ali Bahar", "Buth", "Buth dera", "Chinjni", "Chodero", "Dera", "Dhamrah", "Fekhrato", "Guko", "Gul Sangar", "Jalbani", "Kathia Bazar", "Khadhari", "Laiquepur", "Lakha", "Mangio", "Muradi", "Nasirabad", "Thariri Hashim", "Wahucha", "Wasu Kalhoro"],
//     "Qubo Saeed Khan": ["Bagodaro", "Bellati", "Dhoori", "Dur Mohammad", "Gada", "Hakra", "Hazarwah", "Imam Bux", "Ishaque", "Jagir", "Jamali", "Kamil", "Khokhar", "khuhawar", "Kohistan", "Kot Shahbag", "Machi", "Mast ali", "Mohammad Hassan", "Mugheri", "Pat No 1", "Pat No2", "Pathuja", "Phalai", "Pir bux", "Qubo Saeed khan", "Sadique", "Samander", "Sarhad", "Seer Chandia", "Seer dakhan", "Seer Jamali", "Seer Magsi", "Seer Setlement", "Shah Waryaso", "Trangra", "Waryal", "Zar"],
//     "Shahdadot": ["Bhatti", "Bhurgeri`", "Bhutta", "Chandia", "Choudha", "Dakhan", "Dhing", "Gahanwar", "Gopang", "Gurgaj", "Hameer", "Idden Jarwar", "Jari", "Jatoi", "Jhurir", "Juneja", "Kalar", "Kalhora", "Kario Ahmed Khan", "Kario Sobdar", "Khosa", "Koor Kari", "Kot Karira", "Kot Nabi Bux", "Leghari", "Magsi", "Markhand", "Meena", "Miro Khan", "Noor Pur", "Qutria`", "Sando", "Sanjar Bhatti", "Seelra", "Shahdadot", "Shaho Jamali", "Siyal", "Sukkur Jarwar"],
//     "Sijawal Junejo": ["Aalam Khan Junejo", "Arzi Bhutto", "Bakhsho Sario", "Belharo", "Chakar Suleman", "Chango", "Dhingano Mahesar", "Fateh Khan Dhamraho", "Fatuhal Chodo", "Ghulam,Muhammad Leghari", "Gul Kalhoro", "Gul Shah", "Hayat Gopang", "Hyder Chandio", "Hyder Detho", "Jaleel Kalhoro", "Jiand Laak", "Kallar", "Kandi", "Kario Wah", "Khaliq Dino Dakhan", "Koor Sahab", "Korai", "Lal Khan Mastoi", "Lashkar Khan Chandio", "Mastoi", "Mohammad Gujrani", "Mohmammadi Tanwari", "Saeed Khan Junejo", "Sher Khan", "Sijawal", "Soonharo Bhatti"],
//     "Warah": ["Abad", "Ali Ashabo", "Anhoon", "Bisharat Kacheri", "Bisharat Khuhawar", "Bukechani", "Bund Jani", "Chak Faridabad", "Chak Faridabad no1", "Chak Faridabad no2", "Chakabad", "Chandni Jagir", "Cjhak Bisharat", "Gaji Khuhawar", "Garhi Jagir", "Garhi Markoro", "Gul Buriro", "Hamal", "Hamid wah", "Hassan Huri", "Jakhar", "Jogi", "Junani", "Kalar", "Khandoo", "Lalu raounak", "Maklani", "Mangneja", "Mirpur", "Mirzapur", "Nangdero", "Nawab Kalhoro", "Pechuha", "Potho", "Safar Tunio", "Sanhari", "Tahriri Hajran", "Thano`", "Theth", "Ubedani", "Wagan", "Warah", "Yarodero"]
//   },
//   "Kashmore": {
//     "Kashmore": ["Badani Kacho", "Badani Pako", "Bai Rup", "Belo", "Bhanar", "Bindo Murad", "Buxapur", "Chachar", "Daro Jhando", "Domewali", "Elsi", "Gandheer", "Geehalpur", "Gishkori", "Gondak Kosh", "Gublo", "Gullanpur", "Haji Khan", "Jakhrani", "Jalal Sudh", "Kacho Bahadurpur", "Kacho Kashmore", "Kacho Khoski", "Karimabad", "Kath Garh", "Kauro Mahar", "Keejhar", "Khahi Kacho", "Khahi Pako", "Khewali", "Kubhar", "Kumb", "Kumbhri", "Line Purani", "Machhi", "Mahar", "Masoowalo", "Mekhan Bello", "Mithri", "Muhammadadani", "Noorpur Kacho", "Noorpur Pako", "Pako Bahadurpur", "Pako Kashmore", "Pako Khoski", "Rio Kacho", "Sain", "Samo", "Shah Ali Pur", "Shah Garh Kacho", "Shah Garh Pako", "Silachi", "Sodhi", "Sorah", "Thalho", "Toj", "Zor Garh"],
//     "Kandhkot": ["Aalamabad", "Akhero", "Arain", "Babarwari", "Balochabad", "Bilhari", "Buxpur", "Chaman", "Dadar", "Dari", "Dhabhani", "Dhandhi", "Dhao", "Lahri Domki", "Doulatpur", "Fareed abad", "Garhi", "Ghoraghat Katcho", "Ghoraghat pako", "Ghouspur", "Gulabpur", "Haibat Katcho", "Haibat pako", "Jaffarbad Katcho", "Jageerabad", "Jangin", "Kajli", "Kandhkot", "Keti", "Khairwah", "Khan wah", "Khanbhri", "Kundharo Katcho", "Machko", "Makan maro", "Makhwani", "Malguzar", "Malheer", "Malookan", "Mangi", "Mari", "metahar", "Rasaldar", "Rejmatabad", "Shah mohd Jeelani", "Sunhiyanipur", "Teghani", "Wahidpur", "Wakro"],
//     "Targwani": ["Allah abad", "Bahalkani", "Bargh", "Beghoo", "Bijarani", "Cheel", "Dabli", "Duniyapur", "Gazi", "Ghano Khoso", "Gudo", "Gulwali", "Hajano", "Hazaro", "Heeranpur", "Jaffarbad", "Jamal", "Jhalo", "Karampur", "Kari", "Khairo", "Kot dothi", "Lalao", "Lashari`", "Manjhi", "Mari jafar", "Nar", "Naseer", "Ninde ji Dhori", "Qureshi", "Saido kot", "Saifal", "Salghni", "Sanheri", "Sawan Gabol", "Shah gazi", "Sher garh", "Sherhan", "Sorwah", "Suhliyani", "Targwani", "Unar"]
//   },
//   "Khairpur": {
//     "Khairpur": ["Aalipur", "Abad Jagir", "Atteri", "Baberloi", "Bhurgari", "Bindi Muhammad Panah", "Bugro", "Chaar Jagir", "Chhejro", "Danwaro", "Gujo", "Hajna Shah", "Jhaloji", "Keti Muhari", "Khairpur", "Khanpur", "Khariro", "Kouro Phulpoto", "Lalo Shedi", "Luqman", "Machyoon", "Mangi", "Mehar Ali", "Mitho Mari", "Nizamani", "Palh", "Paneero", "Panwari", "Phatt", "Phulwahan", "Pipri", "Pir Mangio", "Raina", "Shadi Shaheed", "Shah Bhangio", "Shah Ladhani", "Tando Masti", "Tando Nazar Ali", "Tando Nehal", "Therhi", "Ubhari", "Wassan", "Wisro Wahan"],
//     "Gambat": ["Agra", "Baharo Dero", "Baharo Katcho", "Belharo", "Belharo Katcho", "Dhandan", "Dodo Bhutto", "Draza Chak-1", "Draza Chak-2", "Draza Chak-3", "Fato Sial", "Gambat", "Gangar", "Gigra Kalhora", "Golo Wahan", "Jado Wahan", "Jamra", "Kaleri", "Kamal Dero", "Keti Abhouro", "Keti Morio", "Keti Unar", "Khairo Dero", "Khemtia", "Khuhra", "Lakha", "Lal Kumbhar", "Mehro Pathan", "Miani", "Mujhid", "Nando Baharo", "Paleeja", "Paleja Kacho", "Phori", "Pir Esso", "Razi Dero", "Razi Dero Katcho", "Ripri", "Saidi Bala", "Saidi Lowor", "Sanhri", "Sarohi", "Satabo", "Shah Takio", "Sial Pathan", "Sial Pathan Kacho", "Sial Pathan/Agra Boring", "Tagar Chak-2", "Toori", "Wad Pagia"],
//     "Kingri": ["Abdullah Kalhoro", "Ahmed Pur", "Baharpur", "Bambho Khoruam", "Beli Chani", "Bhambho Dero", "Chachar", "Denal Shah", "Drib Rozi", "Fareed Abad`", "Fateh Ali Chandio", "Gahno Kalhoro", "Garhi", "Mori", "Gadhi", "Ghuriri", "Gumchi", "Kainchi", "Kanjan", "Katohar", "Keti Pandhi", "Keti Mehar", "Kingri", "Kolab Jail", "Langah", "Mangerji", "Manghanwari", "Mari", "Mian Khan", "Miano", "Mitho dero", "Mohil", "Noorpur", "Paki Khohi", "Pir Shahbazi", "Piryalo", "Qaim Kalhoro", "Rafique Mahesar", "Rahouja", "Rajo Dero", "Sadarji", "Saeed pur", "Saidi", "Sri Ghanwar Khan", "T.M.Hyder", "Ulra Chak 1", "Ulra Chak 2", "Ulra Chak 3", "Ulra Chak 4"],
//     "Kotdiji": ["Agha Hashim Shah", "Ali Muhammad Machhi", "Arab Machhi", "Arbani", "Babar", "Bago Dharo", "Baharo Lashari", "Bakho Lashari", "Bapho", "Chhudahu", "Chouniro", "Dadloo", "Dhukar", "Fateh Pur", "Goondariro", "Hussainabad", "Jahndo Mashaikh", "Jiskani", "Junna", "Kanasira", "Khuda Bux Hisbani", "Kotdiji", "Kotlu", "Layari", "Luhrani", "Malku Wahan", "Mehrano-1", "Mehrano-2", "Mir Khan Muhammad", "Mithan Fakir", "Mithri", "Muhammad Hajam", "Muhbat Wah", "Nagrija", "Naro Dhoro", "Nasir Fakir", "Nawab Wassan", "Nebahu Patta", "Noor Bozdar", "Panhwari", "Patta", "Pir Gudo", "Pir Misri", "Qaim Gopang", "Raban Rajper", "Rajpari", "Rind", "Shafi Muhammad Ujjan", "Sohu", "Sono Gopang", "Talpur Wada", "Tando Shah", "Wali Muhammad Bhatti"],
//     "Mirwah": ["Ahmed Ali Wah", "Allah Dino Amur", "Allah Wasayo Depar", "Bago Dhoro", "Bozdar", "Chutto Wandier", "Dato Dasti", "Deparja", "Dhedhano", "Faiz Muhammad Mojai", "Gabar", "Gahi Chakrani", "Gigro", "Habib Phull", "Halepota", "Hindyari", "Jalalani", "Jalbani", "Jangwaro", "Jeorge Ali Murad", "Kalro", "Kanchhi", "Kharirah", "Khuda Bux Kubar", "Mandan", "Maroro", "Matt", "Mengho Shar", "Mossan Shah", "Mothar", "Muhammad Ashabi", "Mureed Haji", "Nazim Shar", "Pirwasan", "Punihar", "Ranyah", "Sabar Rind", "Saindad Haji", "Saindad Machhi", "Saneso", "Sanjrani", "Sawri", "Seri", "Shah Nawaz", "Sher Khan Lund", "Soofai", "Sutyaro", "Tali", "Tando Mir Ali", "Tarko", "Telahu", "Thari", "Wagah", "Wali Dad Lund", "Waryam Wandier"],
//     "Nara": ["Ahsan jaro", "Beewari", "Bewatoo", "Bhait tharoji", "Bhaongiwari", "Bhit bhonji", "Bhit kindari", "Bux ali aradin", "Chachro", "Chhohar shar", "Choondko-1", "Choondko-2", "Dadu", "Dandh simmi", "Daoji", "Darbhoo", "Dedhano", "Dingari", "Dodiwari", "Geandhaou", "Ghulam Hussain", "Gogo", "Gulab bhanbhro", "Idhoie", "Illyas wari", "Jhuryaro", "Jubo", "Kamaraho", "Katgarh", "Kathore", "Kharch", "Khenwari", "Kherap", "Kirari", "Kiri aradin", "Klahoo", "Ladhou", "Laiwari", "Lemoo rajpar", "Luck turko", "Methari", "Muhammad khan bhurgari", "Nisrullah", "Pateji", "Patel pota", "Pharhiyaro", "Pir bux aradin", "Pir bux gaho", "Pir ibu", "Razo bhanbhro", "Sarhadano", "Saido", "Sami pota", "Santarahoo", "Soomarwari", "Sorah", "Tahroji", "Taj muhammad mullo", "Tajal"],
//     "Faiz Ganj": ["Abdullah Hisbani", "Akri", "Akro", "Allah Warayo", "Amin Pato", "Anheeri", "Anoi", "Araro", "Aub", "Baseero", "Bather", "Bhangu Behan", "Budho Mullo", "Buo", "Cheena", "Chibherero", "Derah", "Dhundh", "Gadano", "Ghulam Nabi", "Hussain Shah", "Hussian Pato", "Izat Shar", "Jaffar Lashari", "Jakhereri", "Jalalji", "Kandiari", "Karam Khan", "Karoondi", "Khair Muhammad", "Khinyari", "Khuteero", "Kot Laloo", "Kup", "Lakhrand", "Mari", "Mehar Ali Unar", "Mitho Chang", "Moheja", "Mohib Shah", "Nangar Shah", "Nazar M.Behan", "New Laheero", "Nindhero", "Pacca Chang", "Palyo Lashari", "Paneeri", "Pario Mari", "Pholahri", "Prano Laheero", "Punhal Rajper", "Radhan Mashaikh", "Rattar", "Sahito", "Sijawal Rajper", "Tarai", "Uman", "Usman Mullo", "Wahleer"],
//     "Sobho Dero": ["Abdul Karim Kharal", "Bhellar", "Bhombhatpur", "Bindi Motayio", "Chutto Channo", "Gaddeji", "Gahno Bhagat", "Hingoreja", "Kazi Bhutta", "Keti Kanoori", "Keti Moosa Bughio", "Keti Noorpur", "Khalifa Huryah", "Kharal", "Kot Chandiko", "Larik", "Machhar", "Maddd", "Mangi Mari", "Mangnapota", "Meerak", "Mehnidero", "Mir Khan Shahani", "Niwaro", "Noor Pur Katcho", "Noor Pur Reyasat", "Pialo", "Pir Mashaikh", "Pir Taj Muhammad", "Pir Umar Shah", "Rahopota", "Ranipur", "Ranipur Road", "Rasoolabad", "Rukrani", "Sagyon", "Sahita", "Sami", "Setaerja Bala", "Setharja Lower", "Shah Awais", "Sobhodero", "Thatti", "Tunia", "Watani"]
//   },
//   "Larkana": {
//     "Larkana": ["Agani", "Ahmed Pathan", "Akil", "Bago Vighamal", "Baid Sangi", "Bero Chandio", "Bindi", "Bugti Baloch", "Chakar Ali", "Chuharpur", "Chutto Mahesar", "Dara Gaad", "Dhamrah", "Dodai", "Fatehpur", "Fati Bilwal", "Ghanghro", "Illyas", "Jamarani", "Jiand Jatoi", "Kanga", "Kathar", "Kathoro Bado", "Khalid", "Khedkar", "Kothi", "Lahno Samito", "Lahori", "Langh", "Larkano", "Loungai", "Lund", "Masu Hab", "Mitho Dero", "Miyani Nihal", "Morio Khuhro", "Nangar Sangi", "Nasurullah", "Nau Abad", "Nazar Thariri", "Nindero", "Phul", "RasheedWagan", "Rato Kot", "Rato Kot Rayati", "Sache Dino Kalhoro", "Sanhri", "Soomar Sangi", "Sultan Abro", "Talbani", "Valeed", "Vikia Sangi", "Wah Nabi Bux", "Zakrio Mahesar"],
//     "Rato Dero": ["Phulpota", "Akil Hakro", "Banguldero", "Bhahman", "Bhando Rato", "Bhutta", "Bossan", "Chajra", "Chhango Rahujo", "Daranpur", "Doda Khan Bhutto", "Dosu Dar", "Drabhi", "Fatehpur", "Gachal", "Gh. H. Hakro", "Jumo Agham", "Kalar Sarkari", "Khairodero", "Khan Wah", "Khuda Bux Bhutto", "Kodrani", "Kohri", "Kubro", "M.K Jalbani", "Mamo Jagir`", "Mamo Rayati", "Masu Dero", "Mevo Ghanghro", "Miyani Noor Malah Jagir", "Miyani Noor Mallah Rayati", "Moria Faqir", "Mullan Kalhora", "Naudero", "Nazar Detho", "Nazar Ghangro", "Noor Pur", "Panju Abro", "Panju Kinaro", "Panju Lorir", "Patro", "Pawro", "Pir Bux Bhutto", "Rahuja", "Rajudero", "Saidodero", "Salar Janwari", "Sanjar Abro", "Sarho Ghanghro", "Shadi Abro", "Shadi Agham", "Sharif Pur", "Tayyab", "Unar", "Wali Dad Veesar", "Waris Dino Machhi", "Wassand Jeho", "Wassayo Bhutto", "Yaru Pitafi", "Zangehja"],
//     "Dokri": ["Abrepota", "Baburi", "Badah", "Bagi", "Bhangia Kalhora", "Beli gaji", "Budho dero", "Chakro", "Dabuli Vechob", "Dokri", "Fateh pur", "Gaji dero", "Ghanghriko", "Gujar", "Jadam Kalhoro", "Kabuli", "Karani", "Khachar pur", "Khair wah", "Khairo jhatiyal", "Khooh Norang", "Latri", "Mirzai", "Nari Lashari", "Samitia", "Seehar", "Sui", "Tiger", "Veehar", "Wakro", "Yaru Lakhair"],
//     "Bakrani": ["Abad", "Amrot", "Arija", "Bakrani", "Baqa Pur", "Behleem", "Belhari", "Bhutta Kalhora", "Dandano", "Daro Dodaiko", "Darya Khan", "Dhandhra", "Fareed Abad", "Ganjo", "Garello", "Gud", "Hassan Wahan", "Jatoi Chachar", "Kania", "Kanuri", "Karira", "Kot Chandiko", "Mad Bahu", "Mahar Wada", "Mato", "Mehrab Pur", "Mir Khan Abro", "Nasirabad Jagir", "Nasirabad Rayati", "Noor Pur", "Panjo Khohkhar", "Salhani", "Shah Baig", "Shah Nawaz", "Shaikh Fojo", "Simno", "Sunhari Jagir", "Sunhari Rayati", "Tagar", "Thullah", "Yako Sandilo"]
//   },
//   "Matiari": {
//     "Hala": ["Bhanbhri", "Bhanoth", "Bhit Shah", "Bundh", "Bunglow", "Bureri", "Char", "Dhabri", "Gahoth", "Gaib peer", "Ghoghat", "Ghotana", "Hala", "Hala old", "Jamlabad", "Jhirki", "Kalri", "Katcho Khanoth", "Keeriya", "Khandu", "Khanoth", "Kutkai", "Lakhisar", "Narli", "Nizamani", "Nooralabad", "Noorketi", "Pir Bilawal", "Rechal", "Rojhani", "Salaro", "Sandhan", "Shaikhani", "Tarah", "Verato"],
//     "Matirai": ["Abrejani", "Arain", "Barechani", "Baudero", "Bhanoki", "Bhorko", "Buhryoon", "Chharao", "Dhando", "Ganag rayati", "Gang jagir", "Hakra", "Jaheki", "Jaindal Kot", "Jakhri jagir", "Jakhri Joya", "Jakhri rayati", "Ketti", "Khorkhani", "Khudi", "Khyberani", "Koheki", "Lutryoon", "Mari", "Matiari", "Mubarak wah", "Nindero", "Oderolal", "Palijani", "Panhwarki", "Pano", "Porath", "Reechal", "Sadri", "saeedpur", "Sahib Saman", "Sattar", "Sekhat", "Shahpur", "Sipki Jagir", "Sipki Rayati", "Sohiki", "Soomra", "Sultanpur", "Tajpur", "Thano", "Thorha", "Vesro", "Wassan"],
//     "Saeedabad": ["Ahano", "Amin lakho", "Bawri", "Chhachhri", "Chhapar kahan", "Chitori", "Dalo keti", "Dethki", "Fatehpur", "Gadali", "Giss", "Jamali", "Kaka", "Khatoori", "Khuteero", "Koonar", "Larh", "Manahi", "Odiyanoo", "Panjmoro", "Peengharo Jagir", "Peengharo Raieti", "Rahoo", "Rahooki", "Ranoo", "Saeedabad", "Suhrabpur", "Zairpir"]
//   },
//   "Mirpurkhas": {
//     "Mirpurkhas": ["PanhwarKi", "Khuth"],
//     "Digri": ["169-Digri", "141", "142", "144", "147", "148", "149", "150", "151", "152", "154", "155", "156", "157", "158", "159", "160", "161", "163", "164", "166", "167", "168", "170", "171", "172", "173", "174", "176", "177", "178", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "191", "192", "193", "194", "195", "196", "197", "199", "200", "201", "204", "206", "262", "263", "265", "143-Abadgar", "144-A", "146-Leghari", "153-Pabban", "161-A", "162-A", "162-Mir Mohd Hassan", "165-Sonhari", "175-abring", "179-Mehar", "190-Qazi Ashraf", "198-A", "198-Basran"],
//     "Hussain Bux Mari": ["101-Mirpurkhas", "77", "80", "81", "88", "89", "90", "92", "93", "96", "97", "98", "99", "102", "103", "104", "106", "107", "108", "109", "110", "112", "113", "114", "115", "116", "117", "119", "120", "121", "122", "123", "125", "100-Pir Azeem Shah", "105-Bhitaro", "111-Mirpur Old", "118-Veesro", "71-Sikanderabad", "78-Sakho", "79-A", "79-Patoyoon", "81-A", "82-A", "87-M.h.Mari", "91-Khan", "94-Miro Mari", "95-Khudri"],
//     "Jhudo": ["309-Bandwari", "203", "205", "264", "310", "311", "312", "314", "315", "316", "317", "341", "342", "344", "352", "353", "354", "355", "356", "357", "360", "362", "363", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "202-mir Khuda bux", "313-Jhudo", "318-A", "318-Roshanabad", "319-A", "319-B", "319-C", "319-mir Malik Mohd", "340-Gunero", "341-A", "343-Karam Ali", "344-A", "345-A", "354-A", "358-A", "358-Bakhar", "359-Bilalani", "366-A", "367-A", "368-A", "370-A", "373-A", "Akhuto", "Athela", "Dehti", "Janhan", "Samroti", "Udhejani"],
//     "K.G.M.B": ["290-A", "209", "211", "212", "213", "215", "216", "218", "222", "223", "230", "231", "232", "233", "234", "235", "252", "253", "255", "257", "261", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "287", "288", "289", "290", "291", "292", "293", "295", "296", "297", "298", "300", "301", "302", "303", "305", "306", "307", "308", "320", "321", "322", "323", "324", "329", "331", "332", "333", "334", "335", "336", "338", "345", "346", "347", "348", "349", "350", "351", "208-TAgi", "210-Kalwari", "214-Murad shah", "221-Dengan", "251-Chanuro", "254-Gorchani", "256-Wagherji", "258-Kachelo", "259-Sodha Bore", "260-Khudabad", "268-A", "270-A", "274-A", "279-A", "286-Rajwah", "294-Sakari", "299-Lal shah", "301-A", "303-A", "304-A", "304-kario Pipar", "308-A", "320-A", "320-B", "322-A", "328-A", "328-Chach", "330-Berani", "337-Jalabad", "339-A", "339-Jawariasar", "348-A", "349-A"],
//     "Shujabad": ["140", "145", "217", "224", "225", "236", "237", "238", "239", "243", "244", "245", "246", "247", "248", "249", "250", "378", "379", "380", "381", "382", "383", "384", "385", "107 A", "377-Dolatpur", "Belaro", "Boorji", "Chahoo", "Chand Morio", "Chelaro", "Dhanghki", "Kak", "Kantrai", "Khandar", "Khumbri", "Manjri", "Mirwah", "Mubarak", "Pannonundani", "Phadro", "Sangro", "Seri", "Toori"],
//     "Sindhri": ["128-Kathri", "73", "75", "76", "124", "126", "127", "129", "130", "131", "132", "133", "134", "135", "137", "138", "226", "227", "228", "229", "240", "241", "242", "136-Jhurbi", "72-Chitori", "74-Khirah", "Allah Bux Mari", "Allah Khani", "Ameen Aukar", "Assassar", "Atna", "Bhanusar", "B-Khirah", "Chari Bux Pahore", "Chari Manglan", "C-Potho", "Dahoro No:1", "Dahroro No:2", "Dhair Mitho Faqir", "D-Khandar", "Dobto", "Fateh Muhammad Mashakh", "Ganbo faqir", "Gichar", "Girhore Sharif", "Halepotani", "Hanjarhadi", "Hingorno", "Jamilani", "Kahroro", "Kakeji", "Kander", "Kangal", "Kani Maghrio", "Khani Maghrio", "Kheer Tarai", "Laiqpur", "Liyari", "Lund", "Malook halepoto", "Nindo Junejo", "Palango", "Phulahdyun", "Potho", "Rawatro", "Saidki", "Saifal No:1", "Saifal No:2", "Sain dad Chhoro", "Sarhal", "Sarhari", "Sindhri", "Tagusar", "Talho Junejo", "Walwari", "Warariyon"]
//   },
//   "Naushahro Feroze": {
//     "Naushahro Feroze": ["Abji", "Agham", "Arban", "Batil", "Bhanbhri", "Bhurnd", "Bookar", "Chanari", "Changal", "Cheeho", "Dall", "Danheja", "Dhori Bachal", "Gejh No 2", "Gejh No1", "Ghanghro", "Izzat Waggan", "Jarri", "Jiskani", "Kajhar", "Kalooro", "Kalro", "Kanghal", "Keti Abu Bakar No1", "Keti Abu Bakar No2", "Khariro", "Khuhawar No.1", "Khuhawar No.2", "Khuhi Jalal", "Koor Gahno", "Koor Hassan", "Loothi", "Masur Ji Wai", "Menghlo", "Miranpur", "Mithiani No.1", "Mithiani No.2", "Mubejani", "Nathar Detha", "Naushahro", "Noor Pur", "Paddidan", "Panjo", "Parya", "Phull", "Pir Parto", "Sahib Khan", "Seengarchi", "Serhal", "Sher Khan", "Shuja Muhammad", "Tetri", "Thatt No 1", "Thatt No2", "Veesar", "Wagan", "Wassan", "Wassayo"],
//     "Moro": ["Abad Kahkot", "Belo Khero Dero", "Belo Lalia", "Bet Budho", "Bhambhro Dero", "Borarai", "Chando", "Chaneja", "Dalchand", "Daris", "Deparja", "Dheeran Jagir", "Dilo Shah", "Doro Behan", "Dumber Ji Wai", "Fareed Dero", "Fato Balal", "Fazil Jagir", "Ganghan Jagir", "Ghairabad Kahkot", "Gharho", "Junalo", "Kacho Koheri", "Kalhora", "Karap", "Kareja", "Karocho", "Kenchi Jagir", "Khair Wah", "Khaliso", "Khero Dero", "Khokhar", "Korai", "Kot Satabo", "Lalia", "Lett", "Lundki", "Malkani", "Manaheen", "Mari", "Miran Jatoi", "Misri", "Moro", "New Gachero", "Old Gachero", "Qaim Koor", "Sadhuja", "Saleh Pur", "Sehra", "Sultan Behan", "Wad Pagia", "Waryaso Jagir", "Waryaso Rayati"],
//     "Meharabpur": ["Bago Daro", "Behlani", "Bhorgi", "Chibhar Babhan", "Deengaro", "Dehat", "Dewan", "Dodha", "Godho Hindu", "Halani", "Hote Khan Jalbani", "Jaindo Rajper", "Khakhri", "Kharik", "Khuda Bux Jalbani", "Kotri Kabeer", "Langarji", "Mad Ibyani", "Mehar Haji", "Meharabpur", "Moule Dino Haji", "Natho Rajper", "Nau-Abad", "Peer Waito", "Punjaban", "Qaisar Mari", "Rajo Dahri", "Saeed Pur", "Saleh Sahito", "Sangi", "Sittar Dino Mangrio", "Syed Shuja", "Tuttah", "Vighia Mal"],
//     "Kandiaro": ["Abad-111", "Bahri-1", "Bahri-2", "Bazidpur", "Beelo kamaldero", "Bello mohbatdero", "Bello sumita", "Belo Bhounar", "Bhagodero-1", "Bhagodero-2`", "Bhority", "Budak", "Chachak", "Dabhro", "Darbelo new", "Darbelo old", "Detha", "Ghanghra", "Ghulam shah", "Gul shah", "Haji shah", "Jea pota", "Kalatagar-1", "Kalatagar-2", "Kamaldero-1", "Kamaldero-2", "Kandhar", "Kandiaro", "Khairodero", "Khanwahan", "Kouro khushik", "Ladho bisharat", "Lakha", "Larik", "Lundi", "Machi", "Mahessar", "Manjuth", "Mirzapur", "Mohbat dero Jagir", "Mohbatdero Siyal", "Moria", "Mosodero", "Pirmard", "Sahita", "Salehpur", "Samita", "Sethar`", "Shah mirdero", "Shanikhani", "Sona bindi", "Thatt moosa"],
//     "Bhiria": ["Baran", "Bella Wah", "Bhiria", "Bhiro", "Burira", "Chaheen Manomal", "Chakar Wah", "Dali", "Dalipota", "Dheengaro", "Dingaro", "Gher Gujo", "Jalbani`", "Kajar", "Kandir", "Khah Jagir", "Khahi Mamon", "Khahi Qasim", "Khahi Rahu", "Kot Bahadur", "Ladho Rano", "Machur", "Madd Aleem", "Mango", "Molhan Jagir", "Molhan Rayati", "Palano", "Panhwari", "Pano Usman", "Rajo Keerio", "Soondhan", "Tharushah"]
//   },
//   "Sanghar": {
//     "Sanghar": ["Ait Par", "Akanwari", "Awadh", "Bachna", "Bahram Bari", "Bakhoro", "Bao Khan", "Baqar", "Bassi", "Bobi`", "Chah Kabir", "Chamaro", "Chotiaryon", "Dabhri", "Dareri", "Darero", "Daro Bazaar", "Dhilyar", "Dhoro Janib", "Dighal", "Dilshad Dario", "Dim", "Dodan Ja Kanda", "Dubi", "Gharo", "Hamzi Ji Khad", "Harathri", "Jakhro", "Jhun", "Kalar", "Kandiari", "Kehor", "Khadwri", "Khakharo", "Kundho", "Lib", "Loharro", "Lutko", "Makhi", "Mano Khan Chandio", "Mihroo", "Mohd Ali Wah", "Photo Dhoro", "Pir Kehor", "Rachar", "Raj Wah", "Rar", "Rip", "Rohero", "Sadhano", "Sadrat", "Sahar Pir", "Samathri", "Samoor", "Sanghar", "Sanharo", "Santore", "Sareji", "Sethar Pir", "Sim Janido", "Sinhori", "Siran Wari", "Tando Mitha Khan", "Thar Sareji", "Thar Siran Wari", "Togacho", "Toori", "Waghyoon", "Yaro Hingoro"],
//     "Jam Nawaz Ali": ["Berani", "Darhan", "Mari", "22-Dim", "23 Dim", "24 Dim", "25 Dim", "26 Dim", "42 Jamrao", "43 Jamrao", "44 Jamrao", "45 Jamrao", "46 Jamrao", "47 Jamrao", "48 Jamrao", "49 Jamrao", "50 Jamrao", "51 Jamrao", "52 Jamrao", "53 Jamrao", "54 Jamrao", "55 Jamrao", "56 Jamrao", "57 Jamrao", "58 Jamrao", "59 Jamrao", "60 Jamaro", "61 Jamrao", "62 Jamrao", "63 Jamrao", "64 Jamrao", "65 Jamrao", "66 Jamrao", "67 Jamrao", "68 Jamrao", "69 Jamrao", "70 Jamrao", "82 Jamrao", "83 Jamrao", "84 Jamrao", "84-A Jamrao", "85 Jamrao", "86 Jamrao", "Bhadar", "Bhiro", "Hasan Ali", "Hot Wassan", "Jam Jani", "Jampur", "Mashaikh Odho", "Raj Pari"],
//     "Khipro": ["Amli", "Bakherji", "Bantheri", "Bawarli", "Bawarlo", "Bhatyani", "Bhit Bhaiti", "Bhopi", "Boreji", "Chanesari", "Chounro", "Dakhna", "Dar", "Dhadh Liari", "Dhadhro", "Dhilyar A.Hadi", "Dhilyar Rukan", "Ding", "Dugo", "Ellachi", "Ghandelan", "Girhar", "Gorilo", "Halaro", "Hathungo", "Jiao", "Juman", "Kadh", "Kadh Kandiari", "Kamaro", "Kanchhari", "Kangani", "Kaniro", "Kathoro", "Keti", "Khahi", "Khajni", "Khambharo", "Khani Rajar", "Kheerhadi", "Khipro", "Khori", "Khorilo", "Khorlio", "Kirayari", "Koorthari", "Kunri", "Lakhisar", "Loon Khan", "Manhoori", "Marvi", "Mathoon", "Moorhadi", "Moorkadh", "Nehar", "Nian", "Ona Thada", "Pabban", "Paneri", "Pehalwano", "Pharanhadi", "Rahundro", "Ranak Dehar", "Rar", "Rebhan", "Roonjho", "Samarjo", "Samnhar", "Sandh", "Senhoji", "Sigh", "Singhar", "Tarachho", "Tharahadi", "Wadhal", "Waniyani", "Warhiyan"],
//     "Sinjhoro": ["Sinjhoro", "01 Dim", "02 Dim", "07 Dim", "1 Jamrao", "10 Dim", "10.Jamrao", "11 Dim", "11 Jamrao", "12 Dim", "12 Jamrao", "13 A Jamrao", "13 Dim", "13 Jamrao", "14 Dim", "14 Jamrao", "15 Jamrao", "15.Dim", "16 Jamrao", "16.Dim", "17 Jamrao", "17.Dim", "18 Jamrao", "18.Dim", "19 Jamrao", "19.Dim", "2.Jamrao", "20 Jamrao", "20.Dim", "21 Jamrao", "21.Dim", "22 A Jamrao", "22 Hingora", "22 Jamrao", "23 Jamrao", "24 Jamrao", "25 Jamrao", "26 Jamrao", "27 Jamrao", "28 Jamrao", "29 Jamrao", "3 Dim", "3.Jamrao", "30 Jamrao", "31 Jamrao", "32 Jamrao", "33 Jamrao", "34 Jamrao", "35 Jamrao", "36 Jamrao", "37 Jamrao", "38 Jamrao"]
//   },
//   "Shaheed Benazirabad": {
//     "Daur": ["100-Nasrat", "101-Nasrat", "105-A Nasrat", "105-Nasrat", "106-Nasrat", "107-Nasrat", "108-Nasrat", "109-Nasrat", "10-Dad", "10-Nasrat", "110-Nasrat", "111-Nasrat", "112-Nasrat", "113-Nasrat", "114-Nasrat", "115-Nasrat", "116-Nasrat", "117-Nasrat", "11-Dad", "11-Nasrat", "12-A-Nasrat", "12-Dad", "12-Nasrat", "13-Nasrat", "14-Nasrat", "15-Nasrat", "16-Nasrat", "17-Nasrat", "18-Nasrat", "19-Nasrat", "1-Nasrat", "20-Nasrat", "21-Nasrat", "22-Nasrat", "23-Nasrat", "24-Nasrat", "25-Nasrat", "26-A Nasrat", "26-Nasrat", "27-Nasrat", "28-Nasrat", "29-Nasrat", "2-Dad", "2-Nasrat", "30-Nasrat", "31-Nasrat", "32-Nasrat", "33-Nasrat", "34-Nasrat", "35-Nasrat", "36-Nasrat", "37-Nasrat", "38-Nasrat", "39-Nasrat", "3-A Dad", "3-Dad", "3-Nasrat", "40-Nasrat", "41-Nasrat", "42-Nasrat", "43-Nasrat", "44-Nasrat", "45-Nasrat", "46-Nasrat", "47-Nasrat", "48-Nasrat", "49-Nasrat", "4-A Dad", "4-Dad", "4-Nasrat", "50-Nasrat", "51-Dad", "51-Nasrat", "52-Nasrat", "53-Nasrat", "54-Nasrat", "55-Nasrat", "56-Nasrat", "57-Nasrat", "58-Nasrat", "59-Nasrat", "5-Dad", "5-Nasrat", "60-Nasrat", "61-Nasrat", "62-Nasrat", "63-Nasrat", "64-Nasrat", "65-Nasrat", "66-Nasrat", "67-Nasrat", "68-Nasrat", "69-Nasrat", "6-Nasrat", "70-Nasrat", "71-Nasrat", "72- Nasrat", "72-A Nasrat", "73-Nasrat", "74-Nasrat", "75-Nasrat", "76-Nasrat", "77-Nasrat", "78-Nasrat", "79-Nasrat", "7-Dad", "80-Nasrat", "81-Nasrat", "82-Nasrat", "83-Nasrat", "84-Nasrat", "85-Nasrat", "92-Nasrat", "93-Nasrat", "94-Nasrat", "95-Nasrat", "96-Nasrat", "97-Nasrat", "98-Nasrat", "99-Nasrat", "Akro", "Akro-2", "Akro-3", "Akro-4", "Akro-5", "Akro-5/A", "Akro-6", "Akro-7", "Akro-8", "Akro-9", "Amerji", "Chack-2", "Chack-3", "Chack-4", "Chack-5", "Chack-6", "Chak 1to 11 Suhelo", "Chak 1to6 O/Sawri", "Chhan Babu", "G.A Dago", "G.A Daur", "G.A Makhand", "Gojro", "Goongothar", "Gujhro", "Gupchani", "Jhemal", "Jhip", "Kalri", "Mari Sabhar", "Obhari amerji chak-2", "Obhari amerji chak-3", "Obhari sawari", "Panjo Chan", "Shah Hussain", "Suhelo chack-2", "Suhelo chack-3", "Suhelo chack-4", "Suhelo chack-5", "Suhelo chack-6"],
//     "Qazi Ahmed": ["Abad Makkhand", "Ahmed Bughio", "Allah Khai", "Amerji", "Bambhai", "Bambhai Jagir", "Bet Safan", "Bhellaro", "Bogri", "Charioro", "Daulatpur", "Deran", "Dim", "Drigh", "Gair Abad Makhand", "Haberi", "Hothepota", "Jari", "Jarkhoyaro Jagir", "Jarkhoyaro Rayati"]
//   },
//   "Sukkur": {
//     "Saleh Patt": ["Matto MAngrio", "Muhib shah", "Murado", "Nihrad", "Panhwari", "Phat", "Phulokri", "Pir Buxji Bhit", "Pir Karo", "Rajar", "Registan Kartar", "Registan Mamro", "Rip", "Sadano", "Sadri", "Sahi Pat", "Sanghar", "sanhari", "Sanharo", "Setharo", "Shadmano", "Shah Nawaz Shah", "Siran Waro", "Soomarji", "Soonharo", "Sunhari Takar", "Tarai", "Thomi", "Tooryoun", "Udhar", "Ukri Takar", "Umerji", "Umerji Kandun", "Veenghko", "Viyari", "Wass"]
//   },
//   "T.M.Khan": {
//     "T .Gh.Hyder": ["Adhanki", "Ahmedani", "Ajaib Pur", "Arazi", "Bariji", "Bhanki", "Chachri", "Chak", "Chandia", "Charo", "Choubandi", "Dando", "Dauki", "Debgeri", "Doderi", "Fateh bagh", "Gulshan", "Habach", "Jagsiyani", "Jahbgeri", "Jarki", "Jiayath", "Jio", "Jonathi", "Jumoon Jakhro", "Karo Mehro", "Kath Bhambhen", "Khaso", "Kodario", "Kor rahimoon", "Lakara", "Lakhi", "Lashari", "Machari", "Mahi Laghari"],
//     "Bulri shah Karim": ["Narki", "pakhro", "Pakhyarki", "Pir wah", "Qabool pur-II", "Qaboolpur", "Qanadani", "Rain", "Rayati Shor", "Saeed pur", "Sahrani", "Samejani", "Samepotani", "Sandki", "Sathiar", "Shorki", "Sonehri", "Soomerki", "Soomra", "Soorjani", "Sun", "Tikhar", "Umaid Ali Jat"]
//   },
//   "Tando Allahyar": {
//     "Jhando Mari": ["Aelchi", "Bulghia", "Chhachharki", "Daro Sutah", "Daseeri", "Dhaghki", "Gahaiki", "Ghado", "Hadeki", "Halepotani", "Mashaikh Hothi", "Hingorani", "Hotki", "Kathari", "Kehi", "Khado", "Koraiki", "Koryani", "Langhano", "Mail", "Makhoro", "Missan", "Narahado", "Nelorai", "Nimro", "Noori", "Palhi", "Rajpari", "Rappar", "Roopah", "Sajnah", "Seharki", "Seharpur", "Sonhari", "Thebaki", "Vesarki", "Wagori", "Waryaso"],
//     "Tando Allahyar": ["Amri", "Bhanoki", "Bhatti", "Bukerani", "Dalki", "Daro Qubi", "Dhandh Shah", "Dhoro lakhmir", "Ghab", "Gujjo", "Kamaro", "Khokhar", "Lakhyar", "Mareji", "Mehmoodani", "Nahiki", "Nasarpur", "Pak Singar", "Reechhal", "Shaikh Mooso", "Sohna Bukera", "Tando Allahyaar", "Wagodar", "Wasanki"],
//     "Chambar": ["Arraro", "Bail", "Buchar", "Chachh", "Chamber", "Chanbeerah", "Dhaloo", "Garho Sadar", "Jarki", "Jaryoon", "Jhole", "Kandiyari", "Kapaho", "Karyo Gulsher", "Landhi", "Larah", "Lootko", "Mangria", "Meerankhori", "Nagnah", "Noondani", "Saheki", "Sajarchang", "Sandki", "Sehajro", "Sutiyari", "Tarahdi", "Thull", "Wangi"]
//   },
//   "Thatta": {
//     "Thatta": ["Aali Soomro", "Abad", "Agheemani", "Amir Pir", "Bao Purandas", "Bello Bao Purandas", "Bello Chach", "Bello Garkho", "Bello Hellaya"]
//   },
//   "Tharparkar": {
//     "Chachro": ["Charnore", "Dhakalo", "Dharendharo", "Hinjtal", "Hirar", "Janjhi", "Kantio", "Khudi", "Milkam", "Mithrio Charan", "Pabuvero", "Rajoro", "Rarli", "Rawatsar", "Saranghiar", "Tar Hameer", "Tardos"],
//     "Dahli": ["Allah Rakhio Jo Par", "Charihar", "Dahali", "Deburi", "Dohri", "Gadhro", "Gul Muhammad Rahimoon", "Jesse Jo Par", "Jogivero", "Kalario", "Kamanhar", "Khariryoon", "Kheensar", "Kheme jo Par", "Laplo", "Neblo", "Parno", "Pirano Par", "Rohar Kelhan", "Sajan Par", "Siyar", "Tar Ahmed", "Verari"],
//     "Diplo": ["Balihari", "Bhitaro", "Bolhari", "Chhachhi Moora", "Chhai Chhapro", "Chhapanhar", "Dabhro", "Deengario", "Diplo", "Dodharo", "Dohar", "Hamera Beh", "Jangh", "Kaloi", "Kharak", "Khetlari", "Kounral", "Kun Rehmatullah", "Layari", "Melanhar", "Murad Lashari", "Nabisar", "Paneli", "Phant", "Piloori", "Rajar", "Sadoi", "Sajai", "Sandook", "Saran", "Sedio", "Seengario", "Serhi", "Sobhiar", "Soomrasar", "Talo", "Tando Niazi", "Thohar Chhaho", "Turkiar"],
//     "Mithi": ["Veenjhiar", "Vijuto", "Wassaepota"],
//     "Nagarparkar": ["Adhigam", "Balhiari", "Behrano", "Bheemaveri", "Chotal", "Churio", "Dabho", "Dandhoro", "Dhengano", "Ghoti", "Goozri", "Harho", "Hirar Deda", "Kasbo", "Kharirio", "Kharoro", "Ladhovarni", "Mamchero", "Mehrano", "Misri Shah", "Mithrio Juneja", "Mondhro", "Nagarparkar", "Onhair", "Orhamar", "Parodharo", "Piloo", "Pithapur", "Ranpur", "Rathi", "Sabhusan", "Sadooras", "Satidera", "Shivlo", "Somreth", "Soorachand", "Tigusar", "Virawah"]
//   },
//   "Umarkot": {
//     "Umarkot": ["Aahir East", "Ahori Chore", "Makhyaro", "Mandhal", "Marwah", "Mehparo", "Mokhal Bah", "Muhammad Aalam Palli", "Nabisar Thar", "Narhadi", "Noonhyoon", "Okkaro", "Old Chore/Chore Purano", "Padrio", "Panjoi", "Parhyaro", "Rabario", "Rajar Thar", "Rajari Thar", "Sabhri Pat", "Sabhri Thar", "Sabo", "Sadoori Pat", "Sadoori Thar", "Sahib Tar", "Sarangsar", "Sarreti", "Senhoi Thar", "Shakh Khejrari", "Shekhro", "Sidhore", "Sonhari", "Sonpur", "Soofi", "Soonhin", "Tal", "Tangore", "Tar Samoon", "Tebhri", "Thathrai", "Timo Mitho", "Umerkot Pat", "Umerkot Thar", "Veerasar", "Vehro Thar", "Walhate", "Walidad Palli"],
//     "Samaro": ["207", "325", "326", "327", "12-Hiral", "13-A Hiral", "13-Hiral", "14-Hiral", "15-Hiral", "16-Hiral", "17-Hiral", "18-Hiral", "19-Hiral", "207-A", "20-Hiral", "21-Hiral", "22-Hiral", "23-Hiral", "24-Hiral", "25-Hiral", "26-Hiral", "27-Hiral", "28-Hiral", "29-Hiral"],
//     "Kunri": ["Malook Shah", "Manjhakar", "Mayadars", "Mojan", "Moondawai", "Morjhango", "Nabisar", "Naseer Chandio", "Rahmore", "Rajari Pat", "Ranawai", "Rindki", "Sadki", "Sanwari", "Seerkhi", "Shahliwai", "Shakh Darelo", "Talhi"]
//   },
//   "Karachi West": {
//     "Maripur": ["Allah Banoo", "Chhatara", "Gabopat", "Gond Pass", "Lalbakhar", "Maindiyari", "Mann", "Moach", "Moachko"],
//     "Mangho Pir": ["Bijar Bhatti", "Bund Murad (P)", "Halkani", "Hub", "Jam Charkho", "Mai Garhi", "Manghopir", "Mukhi", "Nangan", "Surjani", "Taiser"],
//     "Orangi": ["Orangi"],
//     "Baldia": ["Maouch-I", "Metan"]
//   },
//   "Karachi East": {
//     "Gulshan-e-Iqbal": ["Dozan (P)", "Gujero(P)", "Okewari", "Safooran (P)", "Songal (P)"],
//     "Gulzar-e-Hijri (Scheme 33)": ["Bitti Amri", "Dozan (P)", "Gujro-1", "Songal", "Thoming"]
//   },
//   "Karachi Central": {
//     "Liaqatabad": ["Gujhro (P)"],
//     "Gulberg": ["Gujhro (P)"],
//     "North Nazimabad": ["Kari Lakhi"]
//   },
//   "Karachi Malir": {
//     "Shah Mureed": ["Allah Phihai", "Bund Murad (P)", "Loharki Long", "Mahyo", "Mandero", "Mitha ghar", "Nara thar", "Shah Mureed"],
//     "Bin Qasim": ["Bakran", "Dabeji", "Dhandho", "Ghaghar", "Joreji", "Koteriro", "Pipri", "Sanhro"],
//     "Ibrahim Hyderi": ["Ghangiaro", "Ibrahim Hyderi", "Khanto", "Landhi", "Rehri", "Sahrafi-II"],
//     "Murad Memon": ["Bazar", "Dharano Chano", "Kankar", "Khakhar", "Kharkharo"],
//     "Gadap": ["Abdar", "Amilano", "Bhad", "Boil", "Bolhari", "Chahar", "Jhanjhar", "Gadap", "Huderwah", "Jang Kurd", "Tarari", "Kand", "Karmatiain", "Kathore", "Khaar", "Khdeji", "Langheji", "Lusar", "Mehar Jabal", "Moidan", "Songal"]
//   }
// };


// // EmployeeProfile component for managing employee details
// const EmployeeProfile = () => {
//   // State to hold all form data
//   const [formData, setFormData] = useState({
//     // Personal Information
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     nationality: '',
//     maritalStatus: '',

//     // Contact Details
//     email: '',
//     phone: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     stateProvince: '',
//     zipCode: '',
//     country: '',
//     district: '', // New field for District
//     taluka: '',   // New field for Taluka
//     deh: '',      // New field for Deh (UC)

//     // Employment Information
//     employeeId: '',
//     jobTitle: '',
//     department: '',
//     hireDate: '',
//     salary: '',
//     employmentStatus: '', // e.g., Full-time, Part-time, Contract

//     // Emergency Contact
//     emergencyContactName: '',
//     emergencyContactRelationship: '',
//     emergencyContactPhone: '',

//     // Professional Education (New Section)
//     education: [
//       { degree: '', institution: '', year: '', major: '' }
//     ],

//     // Job Related Documents (New Section - simulated upload)
//     jobDocuments: [], // Stores { name: 'Document Name', url: 'simulated-url' }
//     newDocumentName: '', // For the new document input field
//   });

//   // State to manage form submission status and messages
//   const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
//   const [errors, setErrors] = useState({}); // State to hold validation errors

//   // State for dynamic dropdown options
//   const [districts, setDistricts] = useState([]);
//   const [talukas, setTalukas] = useState([]);
//   const [dehs, setDehs] = useState([]);

//   // Populate districts on component mount
//   useEffect(() => {
//     setDistricts(Object.keys(locationData).map(district => ({ value: district, label: district })));
//   }, []);

//   // Handle input changes dynamically for all form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Clear error for the current field as user types
//     if (errors[name]) {
//       setErrors(prevErrors => {
//         const newErrors = { ...prevErrors };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }

//     // Handle cascading dropdowns for District, Taluka, Deh
//     if (name === 'district') {
//       setFormData(prevData => ({ ...prevData, taluka: '', deh: '' })); // Reset Taluka and Deh
//       const selectedDistrict = locationData[value];
//       setTalukas(selectedDistrict ? Object.keys(selectedDistrict).map(taluka => ({ value: taluka, label: taluka })) : []);
//       setDehs([]); // Clear dehs when district changes
//     } else if (name === 'taluka') {
//       setFormData(prevData => ({ ...prevData, deh: '' })); // Reset Deh
//       const selectedDistrict = formData.district;
//       const selectedTaluka = locationData[selectedDistrict] ? locationData[selectedDistrict][value] : [];
//       setDehs(selectedTaluka ? selectedTaluka.map(deh => ({ value: deh, label: deh })) : []);
//     }
//   };

//   // Handle changes for education array fields
//   const handleEducationChange = (index, e) => {
//     const { name, value } = e.target;
//     const newEducation = [...formData.education];
//     newEducation[index] = { ...newEducation[index], [name]: value };
//     setFormData(prevData => ({
//       ...prevData,
//       education: newEducation,
//     }));
//     // Clear error for the current field if it exists
//     if (errors[`education[${index}].${name}`]) {
//       setErrors(prevErrors => {
//         const newErrors = { ...prevErrors };
//         delete newErrors[`education[${index}].${name}`];
//         return newErrors;
//       });
//     }
//   };

//   // Add new education entry
//   const addEducation = () => {
//     setFormData(prevData => ({
//       ...prevData,
//       education: [...prevData.education, { degree: '', institution: '', year: '', major: '' }],
//     }));
//   };

//   // Remove education entry
//   const removeEducation = (index) => {
//     setFormData(prevData => ({
//       ...prevData,
//       education: prevData.education.filter((_, i) => i !== index),
//     }));
//     // Also clear any errors related to the removed education entry
//     setErrors(prevErrors => {
//       const newErrors = { ...prevErrors };
//       Object.keys(newErrors).forEach(key => {
//         if (key.startsWith(`education[${index}]`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   // Handle change for new document name input
//   const handleNewDocumentNameChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       newDocumentName: e.target.value,
//     }));
//   };

//   // Simulate document upload
//   const handleDocumentUpload = () => {
//     if (formData.newDocumentName.trim()) {
//       setFormData(prevData => ({
//         ...prevData,
//         jobDocuments: [...prevData.jobDocuments, { name: prevData.newDocumentName.trim(), url: '#' }], // '#' as a placeholder URL
//         newDocumentName: '', // Clear input after "upload"
//       }));
//     } else {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         newDocumentName: 'Document name cannot be empty.',
//       }));
//     }
//   };

//   // Remove a job document
//   const removeJobDocument = (index) => {
//     setFormData(prevData => ({
//       ...prevData,
//       jobDocuments: prevData.jobDocuments.filter((_, i) => i !== index),
//     }));
//   };

//   // Basic validation function
//   const validateForm = () => {
//     let newErrors = {};
//     // Required fields validation
//     const requiredFields = [
//       'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone',
//       'addressLine1', 'city', 'stateProvince', 'zipCode', 'country',
//       'district', 'taluka', 'deh', // Added new fields to required validation
//       'employeeId', 'jobTitle', 'department', 'hireDate', 'salary', 'employmentStatus',
//       'emergencyContactName', 'emergencyContactPhone'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = 'This field is required.';
//       }
//     });

//     // Email format validation
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format.';
//     }

//     // Phone number format validation (simple example)
//     if (formData.phone && !/^\d{10,}$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number must be at least 10 digits.';
//     }

//     // Salary must be a positive number
//     if (formData.salary && (isNaN(formData.salary) || parseFloat(formData.salary) <= 0)) {
//       newErrors.salary = 'Salary must be a positive number.';
//     }

//     // Education fields validation
//     formData.education.forEach((edu, index) => {
//       if (!edu.degree) newErrors[`education[${index}].degree`] = 'Degree is required.';
//       if (!edu.institution) newErrors[`education[${index}].institution`] = 'Institution is required.';
//       if (!edu.year) newErrors[`education[${index}].year`] = 'Year is required.';
//       if (!edu.major) newErrors[`education[${index}].major`] = 'Major is required.';
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmissionStatus(null); // Reset status on new submission

//     if (validateForm()) {
//       // Simulate API call
//       console.log('Form data submitted:', formData);
//       setSubmissionStatus('success');
//       // In a real application, you would send formData to your backend here
//       // e.g., fetch('/api/employees', { method: 'POST', body: JSON.stringify(formData) })
//       // .then(response => response.json())
//       // .then(data => { /* handle success */ })
//       // .catch(error => { /* handle error */ });
//     } else {
//       setSubmissionStatus('error');
//       console.error('Form has validation errors:', errors);
//     }
//   };

//   // Reusable InputField component
//   const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
//           ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );

//   // Reusable SelectField component
//   const SelectField = ({ label, name, value, onChange, error, options }) => (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
//       </label>
//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`mt-1 block w-full p-3 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
//           ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
//       >
//         <option value="">Select...</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 font-inter">
//       <header className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-4xl mx-auto"> {/* Increased max-w */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Profile Management</h1>
//         <p className="text-lg text-gray-600">Create or update employee's complete profile.</p>
//       </header>

//       <main className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto mb-8"> {/* Increased max-w */}
//         <form onSubmit={handleSubmit}>
//           {/* Personal Information */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               error={errors.firstName}
//               placeholder="John"
//             />
//             <InputField
//               label="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               error={errors.lastName}
//               placeholder="Doe"
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               error={errors.dateOfBirth}
//             />
//             <SelectField
//               label="Gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               error={errors.gender}
//               options={[
//                 { value: 'Male', label: 'Male' },
//                 { value: 'Female', label: 'Female' },
//                 { value: 'Other', label: 'Other' },
//               ]}
//             />
//             <InputField
//               label="Nationality"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               error={errors.nationality}
//               placeholder="e.g., American"
//             />
//             <SelectField
//               label="Marital Status"
//               name="maritalStatus"
//               value={formData.maritalStatus}
//               onChange={handleChange}
//               error={errors.maritalStatus}
//               options={[
//                 { value: 'Single', label: 'Single' },
//                 { value: 'Married', label: 'Married' },
//                 { value: 'Divorced', label: 'Divorced' },
//                 { value: 'Widowed', label: 'Widowed' },
//               ]}
//             />
//           </div>

//           {/* Contact Details */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Contact Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               placeholder="john.doe@example.com"
//             />
//             <InputField
//               label="Phone Number"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               error={errors.phone}
//               placeholder="+1 (555) 123-4567"
//             />
//             <InputField
//               label="Address Line 1"
//               name="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleChange}
//               error={errors.addressLine1}
//               placeholder="123 Main St"
//             />
//             <InputField
//               label="Address Line 2 (Optional)"
//               name="addressLine2"
//               value={formData.addressLine2}
//               onChange={handleChange}
//               placeholder="Apt 4B"
//             />
//             <InputField
//               label="City"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               error={errors.city}
//               placeholder="New York"
//             />
//             <InputField
//               label="State/Province"
//               name="stateProvince"
//               value={formData.stateProvince}
//               onChange={handleChange}
//               error={errors.stateProvince}
//               placeholder="NY"
//             />
//             <InputField
//               label="Zip Code"
//               name="zipCode"
//               value={formData.zipCode}
//               onChange={handleChange}
//               error={errors.zipCode}
//               placeholder="10001"
//             />
//             <InputField
//               label="Country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               error={errors.country}
//               placeholder="USA"
//             />
//             {/* New Domicile Dropdowns */}
//             <SelectField
//               label="District"
//               name="district"
//               value={formData.district}
//               onChange={handleChange}
//               error={errors.district}
//               options={districts}
//             />
//             <SelectField
//               label="Taluka (Tehsil)"
//               name="taluka"
//               value={formData.taluka}
//               onChange={handleChange}
//               error={errors.taluka}
//               options={talukas}
//               disabled={!formData.district} // Disable until a district is selected
//             />
//             <SelectField
//               label="Deh (UC)"
//               name="deh"
//               value={formData.deh}
//               onChange={handleChange}
//               error={errors.deh}
//               options={dehs}
//               disabled={!formData.taluka} // Disable until a taluka is selected
//             />
//           </div>

//           {/* Employment Information */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Employment Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               error={errors.employeeId}
//               placeholder="EMP001"
//             />
//             <InputField
//               label="Job Title"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               error={errors.jobTitle}
//               placeholder="Software Engineer"
//             />
//             <InputField
//               label="Department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               error={errors.department}
//               placeholder="Engineering"
//             />
//             <InputField
//               label="Hire Date"
//               name="hireDate"
//               type="date"
//               value={formData.hireDate}
//               onChange={handleChange}
//               error={errors.hireDate}
//             />
//             <InputField
//               label="Salary"
//               name="salary"
//               type="number"
//               value={formData.salary}
//               onChange={handleChange}
//               error={errors.salary}
//               placeholder="60000"
//             />
//             <SelectField
//               label="Employment Status"
//               name="employmentStatus"
//               value={formData.employmentStatus}
//               onChange={handleChange}
//               error={errors.employmentStatus}
//               options={[
//                 { value: 'Full-time', label: 'Full-time' },
//                 { value: 'Part-time', label: 'Part-time' },
//                 { value: 'Contract', label: 'Contract' },
//                 { value: 'Intern', label: 'Intern' },
//               ]}
//             />
//           </div>

//           {/* Professional Education */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Professional Education</h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4 p-4 border border-gray-200 rounded-lg relative"> {/* Changed to lg:grid-cols-3 */}
//               <h3 className="text-lg font-medium text-gray-700 col-span-full mb-2">Education Entry #{index + 1}</h3>
//               <InputField
//                 label="Degree/Qualification"
//                 name="degree"
//                 value={edu.degree}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].degree`]}
//                 placeholder="e.g., Master of Science"
//               />
//               <InputField
//                 label="Institution"
//                 name="institution"
//                 value={edu.institution}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].institution`]}
//                 placeholder="e.g., University of California"
//               />
//               <InputField
//                 label="Year of Graduation"
//                 name="year"
//                 type="number"
//                 value={edu.year}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].year`]}
//                 placeholder="2020"
//               />
//               <InputField
//                 label="Major/Field of Study"
//                 name="major"
//                 value={edu.major}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].major`]}
//                 placeholder="e.g., Computer Science"
//               />
//               {formData.education.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeEducation(index)}
//                   className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
//                   title="Remove education entry"
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addEducation}
//             className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//           >
//             Add Education
//           </button>

//           {/* Emergency Contact */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Emergency Contact</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Full Name"
//               name="emergencyContactName"
//               value={formData.emergencyContactName}
//               onChange={handleChange}
//               error={errors.emergencyContactName}
//               placeholder="Jane Doe"
//             />
//             <InputField
//               label="Relationship"
//               name="emergencyContactRelationship"
//               value={formData.emergencyContactRelationship}
//               onChange={handleChange}
//               error={errors.emergencyContactRelationship}
//               placeholder="Spouse"
//             />
//             <InputField
//               label="Phone Number"
//               name="emergencyContactPhone"
//               type="tel"
//               value={formData.emergencyContactPhone}
//               onChange={handleChange}
//               error={errors.emergencyContactPhone}
//               placeholder="+1 (555) 987-6543"
//             />
//           </div>

//           {/* Job Related Documents */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Job Related Documents</h2>
//           <div className="mb-6 p-4 border border-gray-200 rounded-lg">
//             <p className="text-sm text-gray-600 mb-3">
//               (Note: Direct file uploads are not supported in this environment. This section simulates document management.)
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 mb-4">
//               <InputField
//                 label="Document Name"
//                 name="newDocumentName"
//                 value={formData.newDocumentName}
//                 onChange={handleNewDocumentNameChange}
//                 error={errors.newDocumentName}
//                 placeholder="e.g., Resume, Offer Letter"
//               />
//               <button
//                 type="button"
//                 onClick={handleDocumentUpload}
//                 className="mt-6 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 self-end"
//               >
//                 Add Document
//               </button>
//             </div>
//             {formData.jobDocuments.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Uploaded Documents:</h3>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {formData.jobDocuments.map((doc, index) => (
//                     <li key={index} className="flex justify-between items-center text-gray-800">
//                       <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                         {doc.name}
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => removeJobDocument(index)}
//                         className="text-red-500 hover:text-red-700 text-sm ml-4"
//                         title="Remove"
//                       >
//                         Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Submission Button and Status Messages */}
//           <div className="mt-8 text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Save Profile
//             </button>

//             {submissionStatus === 'success' && (
//               <p className="mt-4 text-green-600 font-semibold">Profile saved successfully!</p>
//             )}
//             {submissionStatus === 'error' && (
//               <p className="mt-4 text-red-600 font-semibold">Please correct the errors in the form.</p>
//             )}
//           </div>
//         </form>
//       </main>

//       <footer className="text-center text-gray-500 text-sm mt-8 pb-4">
//         <p>&copy; 2025 Employee Management System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default EmployeeProfile;

// import React, { useState } from 'react';

// // EmployeeProfile component for managing employee details
// const EmployeeProfile = () => {
//   // State to hold all form data
//   const [formData, setFormData] = useState({
//     // Personal Information
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     nationality: '',
//     maritalStatus: '',

//     // Contact Details
//     email: '',
//     phone: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     stateProvince: '',
//     zipCode: '',
//     country: '',

//     // Employment Information
//     employeeId: '',
//     jobTitle: '',
//     department: '',
//     hireDate: '',
//     salary: '',
//     employmentStatus: '', // e.g., Full-time, Part-time, Contract

//     // Emergency Contact
//     emergencyContactName: '',
//     emergencyContactRelationship: '',
//     emergencyContactPhone: '',

//     // Professional Education (New Section)
//     education: [
//       { degree: '', institution: '', year: '', major: '' }
//     ],

//     // Job Related Documents (New Section - simulated upload)
//     jobDocuments: [], // Stores { name: 'Document Name', url: 'simulated-url' }
//     newDocumentName: '', // For the new document input field
//   });

//   // State to manage form submission status and messages
//   const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
//   const [errors, setErrors] = useState({}); // State to hold validation errors

//   // Handle input changes dynamically for all form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Clear error for the current field as user types
//     if (errors[name]) {
//       setErrors(prevErrors => {
//         const newErrors = { ...prevErrors };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Handle changes for education array fields
//   const handleEducationChange = (index, e) => {
//     const { name, value } = e.target;
//     const newEducation = [...formData.education];
//     newEducation[index] = { ...newEducation[index], [name]: value };
//     setFormData(prevData => ({
//       ...prevData,
//       education: newEducation,
//     }));
//     // Clear error for the current field if it exists
//     if (errors[`education[${index}].${name}`]) {
//       setErrors(prevErrors => {
//         const newErrors = { ...prevErrors };
//         delete newErrors[`education[${index}].${name}`];
//         return newErrors;
//       });
//     }
//   };

//   // Add new education entry
//   const addEducation = () => {
//     setFormData(prevData => ({
//       ...prevData,
//       education: [...prevData.education, { degree: '', institution: '', year: '', major: '' }],
//     }));
//   };

//   // Remove education entry
//   const removeEducation = (index) => {
//     setFormData(prevData => ({
//       ...prevData,
//       education: prevData.education.filter((_, i) => i !== index),
//     }));
//     // Also clear any errors related to the removed education entry
//     setErrors(prevErrors => {
//       const newErrors = { ...prevErrors };
//       Object.keys(newErrors).forEach(key => {
//         if (key.startsWith(`education[${index}]`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   // Handle change for new document name input
//   const handleNewDocumentNameChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       newDocumentName: e.target.value,
//     }));
//   };

//   // Simulate document upload
//   const handleDocumentUpload = () => {
//     if (formData.newDocumentName.trim()) {
//       setFormData(prevData => ({
//         ...prevData,
//         jobDocuments: [...prevData.jobDocuments, { name: prevData.newDocumentName.trim(), url: '#' }], // '#' as a placeholder URL
//         newDocumentName: '', // Clear input after "upload"
//       }));
//     } else {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         newDocumentName: 'Document name cannot be empty.',
//       }));
//     }
//   };

//   // Remove a job document
//   const removeJobDocument = (index) => {
//     setFormData(prevData => ({
//       ...prevData,
//       jobDocuments: prevData.jobDocuments.filter((_, i) => i !== index),
//     }));
//   };

//   // Basic validation function
//   const validateForm = () => {
//     let newErrors = {};
//     // Required fields validation
//     const requiredFields = [
//       'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone',
//       'addressLine1', 'city', 'stateProvince', 'zipCode', 'country',
//       'employeeId', 'jobTitle', 'department', 'hireDate', 'salary', 'employmentStatus',
//       'emergencyContactName', 'emergencyContactPhone'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = 'This field is required.';
//       }
//     });

//     // Email format validation
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format.';
//     }

//     // Phone number format validation (simple example)
//     if (formData.phone && !/^\d{10,}$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number must be at least 10 digits.';
//     }

//     // Salary must be a positive number
//     if (formData.salary && (isNaN(formData.salary) || parseFloat(formData.salary) <= 0)) {
//       newErrors.salary = 'Salary must be a positive number.';
//     }

//     // Education fields validation
//     formData.education.forEach((edu, index) => {
//       if (!edu.degree) newErrors[`education[${index}].degree`] = 'Degree is required.';
//       if (!edu.institution) newErrors[`education[${index}].institution`] = 'Institution is required.';
//       if (!edu.year) newErrors[`education[${index}].year`] = 'Year is required.';
//       if (!edu.major) newErrors[`education[${index}].major`] = 'Major is required.';
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmissionStatus(null); // Reset status on new submission

//     if (validateForm()) {
//       // Simulate API call
//       console.log('Form data submitted:', formData);
//       setSubmissionStatus('success');
//       // In a real application, you would send formData to your backend here
//       // e.g., fetch('/api/employees', { method: 'POST', body: JSON.stringify(formData) })
//       // .then(response => response.json())
//       // .then(data => { /* handle success */ })
//       // .catch(error => { /* handle error */ });
//     } else {
//       setSubmissionStatus('error');
//       console.error('Form has validation errors:', errors);
//     }
//   };

//   // Reusable InputField component
//   const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
//           ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );

//   // Reusable SelectField component
//   const SelectField = ({ label, name, value, onChange, error, options }) => (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {error && <span className="text-red-500 text-xs ml-1">(Required)</span>}
//       </label>
//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`mt-1 block w-full p-3 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
//           ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
//       >
//         <option value="">Select...</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 font-inter">
//       <header className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-4xl mx-auto"> {/* Increased max-w */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Profile Management</h1>
//         <p className="text-lg text-gray-600">Create or update employee's complete profile.</p>
//       </header>

//       <main className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto mb-8"> {/* Increased max-w */}
//         <form onSubmit={handleSubmit}>
//           {/* Personal Information */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               error={errors.firstName}
//               placeholder="John"
//             />
//             <InputField
//               label="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               error={errors.lastName}
//               placeholder="Doe"
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               error={errors.dateOfBirth}
//             />
//             <SelectField
//               label="Gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               error={errors.gender}
//               options={[
//                 { value: 'Male', label: 'Male' },
//                 { value: 'Female', label: 'Female' },
//                 { value: 'Other', label: 'Other' },
//               ]}
//             />
//             <InputField
//               label="Nationality"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               error={errors.nationality}
//               placeholder="e.g., American"
//             />
//             <SelectField
//               label="Marital Status"
//               name="maritalStatus"
//               value={formData.maritalStatus}
//               onChange={handleChange}
//               error={errors.maritalStatus}
//               options={[
//                 { value: 'Single', label: 'Single' },
//                 { value: 'Married', label: 'Married' },
//                 { value: 'Divorced', label: 'Divorced' },
//                 { value: 'Widowed', label: 'Widowed' },
//               ]}
//             />
//           </div>

//           {/* Contact Details */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Contact Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               placeholder="john.doe@example.com"
//             />
//             <InputField
//               label="Phone Number"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               error={errors.phone}
//               placeholder="+1 (555) 123-4567"
//             />
//             <InputField
//               label="Address Line 1"
//               name="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleChange}
//               error={errors.addressLine1}
//               placeholder="123 Main St"
//             />
//             <InputField
//               label="Address Line 2 (Optional)"
//               name="addressLine2"
//               value={formData.addressLine2}
//               onChange={handleChange}
//               placeholder="Apt 4B"
//             />
//             <InputField
//               label="City"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               error={errors.city}
//               placeholder="New York"
//             />
//             <InputField
//               label="State/Province"
//               name="stateProvince"
//               value={formData.stateProvince}
//               onChange={handleChange}
//               error={errors.stateProvince}
//               placeholder="NY"
//             />
//             <InputField
//               label="Zip Code"
//               name="zipCode"
//               value={formData.zipCode}
//               onChange={handleChange}
//               error={errors.zipCode}
//               placeholder="10001"
//             />
//             <InputField
//               label="Country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               error={errors.country}
//               placeholder="USA"
//             />
//           </div>

//           {/* Employment Information */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Employment Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               error={errors.employeeId}
//               placeholder="EMP001"
//             />
//             <InputField
//               label="Job Title"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               error={errors.jobTitle}
//               placeholder="Software Engineer"
//             />
//             <InputField
//               label="Department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               error={errors.department}
//               placeholder="Engineering"
//             />
//             <InputField
//               label="Hire Date"
//               name="hireDate"
//               type="date"
//               value={formData.hireDate}
//               onChange={handleChange}
//               error={errors.hireDate}
//             />
//             <InputField
//               label="Salary"
//               name="salary"
//               type="number"
//               value={formData.salary}
//               onChange={handleChange}
//               error={errors.salary}
//               placeholder="60000"
//             />
//             <SelectField
//               label="Employment Status"
//               name="employmentStatus"
//               value={formData.employmentStatus}
//               onChange={handleChange}
//               error={errors.employmentStatus}
//               options={[
//                 { value: 'Full-time', label: 'Full-time' },
//                 { value: 'Part-time', label: 'Part-time' },
//                 { value: 'Contract', label: 'Contract' },
//                 { value: 'Intern', label: 'Intern' },
//               ]}
//             />
//           </div>

//           {/* Professional Education */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Professional Education</h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4 p-4 border border-gray-200 rounded-lg relative"> {/* Changed to lg:grid-cols-3 */}
//               <h3 className="text-lg font-medium text-gray-700 col-span-full mb-2">Education Entry #{index + 1}</h3>
//               <InputField
//                 label="Degree/Qualification"
//                 name="degree"
//                 value={edu.degree}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].degree`]}
//                 placeholder="e.g., Master of Science"
//               />
//               <InputField
//                 label="Institution"
//                 name="institution"
//                 value={edu.institution}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].institution`]}
//                 placeholder="e.g., University of California"
//               />
//               <InputField
//                 label="Year of Graduation"
//                 name="year"
//                 type="number"
//                 value={edu.year}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].year`]}
//                 placeholder="2020"
//               />
//               <InputField
//                 label="Major/Field of Study"
//                 name="major"
//                 value={edu.major}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education[${index}].major`]}
//                 placeholder="e.g., Computer Science"
//               />
//               {formData.education.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeEducation(index)}
//                   className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
//                   title="Remove education entry"
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addEducation}
//             className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//           >
//             Add Education
//           </button>

//           {/* Emergency Contact */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Emergency Contact</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-6"> {/* Changed to lg:grid-cols-3 */}
//             <InputField
//               label="Full Name"
//               name="emergencyContactName"
//               value={formData.emergencyContactName}
//               onChange={handleChange}
//               error={errors.emergencyContactName}
//               placeholder="Jane Doe"
//             />
//             <InputField
//               label="Relationship"
//               name="emergencyContactRelationship"
//               value={formData.emergencyContactRelationship}
//               onChange={handleChange}
//               error={errors.emergencyContactRelationship}
//               placeholder="Spouse"
//             />
//             <InputField
//               label="Phone Number"
//               name="emergencyContactPhone"
//               type="tel"
//               value={formData.emergencyContactPhone}
//               onChange={handleChange}
//               error={errors.emergencyContactPhone}
//               placeholder="+1 (555) 987-6543"
//             />
//           </div>

//           {/* Job Related Documents */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">Job Related Documents</h2>
//           <div className="mb-6 p-4 border border-gray-200 rounded-lg">
//             <p className="text-sm text-gray-600 mb-3">
//               (Note: Direct file uploads are not supported in this environment. This section simulates document management.)
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 mb-4">
//               <InputField
//                 label="Document Name"
//                 name="newDocumentName"
//                 value={formData.newDocumentName}
//                 onChange={handleNewDocumentNameChange}
//                 error={errors.newDocumentName}
//                 placeholder="e.g., Resume, Offer Letter"
//               />
//               <button
//                 type="button"
//                 onClick={handleDocumentUpload}
//                 className="mt-6 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 self-end"
//               >
//                 Add Document
//               </button>
//             </div>
//             {formData.jobDocuments.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Uploaded Documents:</h3>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {formData.jobDocuments.map((doc, index) => (
//                     <li key={index} className="flex justify-between items-center text-gray-800">
//                       <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                         {doc.name}
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => removeJobDocument(index)}
//                         className="text-red-500 hover:text-red-700 text-sm ml-4"
//                         title="Remove document"
//                       >
//                         Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Submission Button and Status Messages */}
//           <div className="mt-8 text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Save Profile
//             </button>

//             {submissionStatus === 'success' && (
//               <p className="mt-4 text-green-600 font-semibold">Profile saved successfully!</p>
//             )}
//             {submissionStatus === 'error' && (
//               <p className="mt-4 text-red-600 font-semibold">Please correct the errors in the form.</p>
//             )}
//           </div>
//         </form>
//       </main>

//       <footer className="text-center text-gray-500 text-sm mt-8 pb-4">
//         <p>&copy; 2025 Employee Management System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default EmployeeProfile;
