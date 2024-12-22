import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import * as TRADS from '../../public/i18n/trad.json';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  onetoten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  trads: any = TRADS;
  trad = 'fr';
  topmenu: any = [
    { en: 'Home', fr: 'Accueil', active: true },
    { en: 'About', fr: 'À propos', active: true },
    { en: 'Portfolio', fr: 'Portfolio', active: true },
    { en: 'Services', fr: 'Prestations' },
    { en: 'Contact', fr: 'Contact', active: true },
  ];
  portfolio: number[] = Array.from({ length: 51 }, (_, i) => i + 1);
  page = this.topmenu[0];
  galleries: any = [
    [
      {
        fr: ['Rencontrez', "l'artiste"],
        en: ['Meet', 'the artist'],
        img: '28.jpg',
        click: 'About',
      },
      {
        fr: ['Explorez', 'la gallerie'],
        en: ['Explore', 'the gallery'],
        img: '3.jpeg',
        click: 'Portfolio',
      },
      {
        fr: ['Découvrez', 'mes prestations'],
        en: ['Discover', 'my services'],
        img: '2.jpg',
        click: 'Services',
      },
    ],
  ];
  lists = [
    ['5.png', '6.png', '7.png', '8.png', '9.png'],
    ['10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    ['16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
  ];
  fields = [
    {
      model: '',
      required: true,
      nom: 'First and last name',
      type: 'input',
      placeholder: 'John Doe..',
      trad: 'Nom et Prénom',
      placetrad: 'John Doe..',
    },
    {
      model: '',
      required: true,
      nom: 'Email address',
      type: 'input',
      placeholder: 'johndoe@gmail.com..',
      trad: 'Adresse mail',
      placetrad: 'johndoe@gmail.com..',
    },
    {
      model: '',
      nom: 'Phone number',
      type: 'input',
      required: true,
      placeholder: '06.50.05.06.50',
      trad: 'Numéro de téléphone',
      placetrad: '06.50.05.06.50',
    },
    {
      model: '',
      nom: 'Occasion',
      required: true,
      type: 'input',
      placeholder: 'Wedding, Special event, Musical Clip..',
      trad: 'Occasion',
      placetrad: 'Mariage, événement spécial, clip musical..',
    },
    {
      model: '',
      nom: 'Date of the event (DD-MM-YYYY)',
      type: 'input',
      required: true,
      placeholder: '25-01-2025',
      trad: "Date de l'événement (DD-MM-YYYY)",
      placetrad: '25-01-2025',
    },
    {
      model: '',
      nom: 'Headcount & requested services',
      type: 'input',
      placeholder: '3 make up + hairstyle, 1 only hairstyle..',
      trad: "Nombre d'invités et services demandés",
      placetrad: '3 maquillages + coiffure, 1 coiffure seulement..',
    },
    {
      model: '',
      nom: 'Time everyone have to be ready by',
      type: 'input',
      placeholder: '11h20',
      trad: 'Heure à laquelle il faut être prêt',
      placetrad: '11h20',
    },
    {
      model: '',
      required: true,
      nom: 'Getting ready location or venue',
      type: 'input',
      placeholder: '125 ter Avenue des champs blancs..',
      big: false,
      trad: 'Adresse des préparations',
      placetrad: '125 ter Avenue des champs blancs..',
    },
    {
      model: '',
      nom: 'Your message',
      type: 'textarea',
      placeholder:
        "Please feel free to share as much information as possible about your wedding day. The more I know about your vision, style, and specific requests, the better I can understand your needs and create a look that's perfect for you. I can't wait to hear all about your plans!",
      huge: true,
      trad: 'Votre message',
      placetrad:
        "N'hésitez pas à partager autant d'informations que possible sur votre journée de mariage. Plus je saurai sur votre vision, votre style et vos demandes spécifiques, mieux je pourrai comprendre vos besoins et créer un look qui vous correspond parfaitement. J'ai hâte de tout savoir sur vos projets !",
    },
  ];
  listeavis: any = [
    {
      nom: 'Laura G.',
      img: '1.jpg',
      txt: "Merci à Cloé pour son professionnalisme. Elle a maquillé ma témoin, ma maman et moi à l'occasion de mon mariage et elle a su largement répondre à nos attentes. Nous étions ravies du résultats et de son travail très professionnel. Je vous recommande vivement les talents de Cloé.",
      trad: "Thank you to Cloé for her professionalism. She did the makeup for my maid of honor, my mom, and me for my wedding, and she exceeded our expectations. We were delighted with the results and her very professional work. I highly recommend Cloé's talents.",
    },
    {
      nom: 'Alice E.',
      img: '22.jpg',
      txt: "Cloe est à l´écoute et attentive à chaque demande. Son travail est incroyable en plus de son professionnalisme, c'est une personne adorable . Malgré le stress du grand jour elle sait détendre et accompagner. Encore merci de m´avoir sublimée pour le plus beau jour de ma vie.",
      trad: 'Cloé is attentive and listens carefully to every request. Her work is incredible, and in addition to her professionalism, she is a lovely person. Despite the stress of the big day, she knows how to relax and support you. Thank you again for making me look beautiful on the most important day of my life.',
    },
    {
      nom: 'Magalie M.',
      img: '23.jpg',
      txt: "Maquilleuse et coiffeuse très professionnelle qui a du talent . J'ai faite appel à ses services car on m'a lâché subitement , elle m'a sauvée la vie . Chaleureuse, très professionnelle, à l'écoute une personne de confiance qui donne de très bons conseils . Je la recommande sans hésiter une coiffure et un maquillage très réussie encore merci pour tout .je vous souhaite une bonne continuation.",
      trad: 'A very professional makeup artist and hairstylist with great talent. I turned to her services because I was suddenly left without help, and she truly saved my day. Warm, highly professional, attentive, and trustworthy, she gives excellent advice. I highly recommend her – my hairstyle and makeup were a great success. Thank you again for everything, and I wish you all the best in the future.',
    },
    {
      nom: 'Kenza P.',
      img: '3.jpeg',
      txt: 'Une maquilleuse parfaite en tout point. À l’écoute et patiente, mon make up a tenu toute une journée+ une nuit sans retouche Cloe a un talent fou dans le maquillage mais aussi en coiffure. Je la recommande à 10000%',
      trad: 'A perfect makeup artist in every way. Attentive and patient, my makeup lasted the whole day and night without any touch-ups. Cloé has amazing talent in both makeup and hairstyling. I highly recommend her 10,000% !',
    },
    {
      nom: 'Florianne R.',
      img: '21.jpg',
      txt: 'Un grand merci à Cloé qui a été très à l’écoute de mes souhaits aussi bien avant l’essai qu’après. J’ai été très satisfaite du résultat de ma coiffure et de mon maquillage le jour J. Les deux ont tenu jusqu’au bout de la soirée. Je la recommande vivement !',
      trad: 'A big thank you to Cloé, who was very attentive to my wishes both before the trial and after. I was very satisfied with the result of my hairstyle and makeup on the big day. Both lasted until the end of the evening. I highly recommend her!',
    },
    {
      nom: 'Constance E.',
      img: '24.jpg',
      txt: "J'ai fait appel à Cloé pour le maquillage et la coiffure de mon mariage. Son travail est remarquable. J'avais une idée assez arrêtée pour la coiffure, qu'elle a totalement respectée. Pour le maquillage en revanche, je lui ai laissé carte blanche car je ne me maquille jamais. Et j'ai été bluffée par le résultat, très naturel et subtil, je ne pensais pas qu'il était possible d'obtenir un tel résultat avec du maquillage ! Elle a également coiffé mes témoins, et on était toutes ravies. Merci Cloé !",
      trad: 'I hired Cloé for the makeup and hairstyling for my wedding. Her work is outstanding. I had a pretty clear idea for the hairstyle, which she completely respected. For the makeup, however, I gave her free rein since I never wear makeup. I was amazed by the result – very natural and subtle. I didn’t think it was possible to achieve such a result with makeup! She also styled my bridesmaids’ hair, and we were all thrilled. Thank you, Cloé!',
    },
    {
      nom: 'Julie T.',
      img: '25.jpg',
      txt: "J'ai demandé à Chloé de me maquiller pour mon mariage en octobre 2023 et j'ai été plus que ravie. Chloé est une personne douée d'un talent indéniable en maquillage de soirée et d'événements. Je te souhaite the best. Mille mercis Chloé",
      trad: 'I asked Cloé to do my makeup for my wedding in October 2023, and I was more than delighted. Cloé is a person with undeniable talent in evening and event makeup. I wish you the best. A thousand thanks, Cloé !',
    },
  ];
  avisClicked = 0;
  public innerWidth: any = window.outerWidth;
  public innerHeight: any = window.outerHeight;
  paysage = true;
  bigscreen = false;

  showMenu = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight;
    this.innerWidth = event.target.innerWidth;

    if (
      event.target.innerHeight > event.target.innerWidth &&
      event.target.innerWidth < 600
    )
      this.paysage = false;
    else this.paysage = true;

    if (event.target.innerWidth > 1300) this.bigscreen = true;
    else this.bigscreen = false;
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.portfolio);
    let int = setInterval(() => {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      console.log(this.innerWidth, this.innerHeight);
      if (this.innerHeight > this.innerWidth && this.innerWidth < 600)
        this.paysage = false;

      if (this.innerWidth > 1300) this.bigscreen = true;
      else this.bigscreen = false;
      clearInterval(int);
    }, 500);

    document.addEventListener('DOMContentLoaded', (event) => {
      console.log('Scroll start');
      const swipeDiv = document.getElementById('swipeDiv');
      if (!swipeDiv) return;

      let startX = 0;
      let startY = 0;
      let distX = 0;
      let distY = 0;
      const threshold = 50; // Distance minimale en pixels pour être considéré comme un glissement
      const restraint = 100; // Distance maximale en pixels pour le déplacement vertical toléré
      const allowedTime = 300; // Temps maximum en millisecondes pour le glissement
      let startTime = 0;

      swipeDiv.addEventListener(
        'touchstart',
        function (e) {
          console.log('touchstart');
          const touchObj = e.changedTouches[0];
          startX = touchObj.pageX;
          startY = touchObj.pageY;
          startTime = new Date().getTime(); // Temps de début du glissement
          e.preventDefault();
        },
        false
      );

      swipeDiv.addEventListener(
        'touchmove',
        function (e) {
          console.log('touchmove');
          e.preventDefault(); // Empêcher le défilement par défaut
        },
        false
      );

      swipeDiv.addEventListener(
        'touchend',
        (e: any) => {
          console.log('touchend');
          const touchObj = e.changedTouches[0];
          distX = touchObj.pageX - startX; // Distance horizontale parcourue
          distY = touchObj.pageY - startY; // Distance verticale parcourue
          const elapsedTime = new Date().getTime() - startTime; // Temps écoulé
          if (elapsedTime <= allowedTime) {
            // Vérifie si le temps écoulé est dans les limites
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
              // Vérifie si la distance horizontale est suffisante et la distance verticale tolérable
              if (distX < 0) {
                if (this.avisClicked < this.listeavis.length - 1)
                  this.avisClicked++;
              } else if (distX > 0) {
                if (this.avisClicked > 0) this.avisClicked--;
              }
            }
          }
          e.preventDefault();
        },
        false
      );
    });
  }

  cantSendMail() {
    return this.fields.find(
      (field: any) => field.required && field.model == ''
    );
  }

  sendMail() {
    let msg = '';
    this.fields.forEach(
      (field: any) => (msg = msg + field.nom + ' : ' + field.model + ' \r\n')
    );

    const dataToSend = {
      from: this.fields[2].model,
      subject:
        this.fields[0].model +
        ' - ' +
        this.fields[5].model +
        ' - ' +
        this.fields[4].model,
      message: msg,
    };
    from(
      fetch('http://chiyanh.cluster031.hosting.ovh.net/SendMailToCloe', {
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'no-cors',
      })
    ).subscribe((data: any) => {
      console.log(data);
    });
  }

  openInsta() {
    window.open('https://www.instagram.com/cloe_mua/?hl=fr', '_blank');
  }

  clickMenu(menu: any) {
    this.showMenu = false;
    var content: any = document.getElementById('middle-content');
    content.style.opacity = 0;

    let int = setInterval(() => {
      this.page = this.topmenu.find((m: any) => m.en == menu)!;
      window.scrollTo(0, 0);
      content.style.opacity = 1;
      clearInterval(int);
    }, 600);
  }
}
