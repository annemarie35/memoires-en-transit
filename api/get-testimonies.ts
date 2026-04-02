type Testimony = {
    id: number;
    date: string;
    genre: string;
    birthPlace: string;
    birthDate: string;
    testimonyConcern: string;
    testifyingFor: string;
    testimonyCity: string;
    testimonyDepartment: string;
    testifyingForBithPlace: string;
    testimonyDate: string;
    testimonyTheme: string;
    testimony: string;
    testimonyLocation: Location | null
};

type Location = [latitude, longitude];
type latitude = number
type longitude = number

export const getTestimonies = (): Testimony[] => [
    {
        "id": 1,
        "date": "6/29/2020 10:14:39",
        "genre": "Une femme",
        "birthPlace": "France",
        "birthDate": "1975",
        "testimonyConcern": "Cela m'est arrivé",
        "testifyingFor": "",
        "testimonyCity": "Montrouge",
        "testimonyDepartment": "75",
        "testifyingForBithPlace": "",
        "testimonyDate": "Février 2019",
        "testimonyTheme": "les papiers d’identité",
        "testimony": "J'ai perdu mon certificat de nationalité française. Deux ans après ma demande,  on m'envoyé une lettre où l'on m'a demandé tous les documents comme si c'était une première demande (ex: certificat de scolarité du collège), alors que j'ai fourni le numero du certificat original. Sous peine de quoi, la lettre se termine par: \"à défaut de quoi, vous vous exposer à ce qu'une décision soit prise au vu des seuls documents produits\". Je suis fonctionnaire d'Etat .\nLa question des papiers est récurrente. Mon nom français et portugais ne coincident pas. Je ne peux donc pas utiliser mes papiers portugais dans la plupart des démarches en France. Lors de ma première demande de passeport français, je n'avais pas pu l'obtenir car au dernier moment, on m'a expliqué qu'il fallait mon certificat de nationalité française, alors que cela ne figurait pas sur la liste des documents à fournir (j'avais une carte d'identité française). \n",
        "testimonyLocation": [
            48.8188544,
            2.3194375
        ]
    },
    {
        "id": 2,
        "date": "6/29/2020 10:27:37",
        "genre": "Une femme",
        "birthPlace": "France",
        "birthDate": "1975",
        "testimonyConcern": "Cela m'est arrivé",
        "testifyingFor": "",
        "testimonyCity": "Bourges",
        "testimonyDepartment": "18",
        "testifyingForBithPlace": "",
        "testimonyDate": "2011-2012",
        "testimonyTheme": "Problème de discrimination au travail",
        "testimony": "J'ai été nommée professeur de philosophie. A la fin de l'année, on m'a évalué comme ne maitrisant pas le français pour enseigner et communiquer ( j'avais un doctorat obtenu en France). Mes parents lorsqu'ils l'ont appris me disaient: \"mais on ne comprend pas, tu as fait toutes tes études en France\".  Par ailleurs, j'avais l'impression que certains professeurs ne vivaient pas bien le fait que je sois professeur de philosophie: ce qui a un certain prestige dans un lycée. Je me souviens en particulier une collègue de classe technnologique dont j'avais le fils dans ma classe et à qui j'avais mis une mauvaise note. Celui-ci en outre, utilisait comme \"secrétaire\" (mot employé en conseil de classe), un élève d'origine portugaise qui notait tous les cours à sa place. \n\nPar la suite, alors que j'avais pris un autre poste cette fois dans le 78, sur les réseaux sociaux, un élève avait écrit suite à une mauvaise note (car il avait rendu un travail baclé - trop court -) qu'il était furieux de se prendre une mauvaise note par \"une fille de plombier portugais\".(Je vous passe l'injure sexiste qu'il y avait en plus)\n\nEn gros, le portugais dans les établissements scolaires, ça va s'ils font prof de portugais ou agent technique. Actuellement, dans mon nouvel emploi à la formation des enseignants dans le 93, parmi les formateurs, aucun prof d'origine portugaise. Je suis la seule.  ",
        "testimonyLocation": [
            47.0811658,
            2.399125
        ]
    },]