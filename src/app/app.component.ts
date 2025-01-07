import { CommonModule } from '@angular/common';
import { Component, HostListener, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import * as TRADS from '../../public/i18n/trad.json';
import { v4 as uuidv4 } from 'uuid';

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
    { en: 'Services', fr: 'Prestations', active: true },
    { en: 'Contact', fr: 'Contact', active: true },
  ];
  portfolio: number[] = Array.from({ length: 55 }, (_, i) => i + 1);
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
  fields: any = [
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
      nom: 'Kenza P.',
      img: '3.jpeg',
      txt: 'Une maquilleuse parfaite en tout point. À l’écoute et patiente, mon make up a tenu toute une journée+ une nuit sans retouche Cloe a un talent fou dans le maquillage mais aussi en coiffure. Je la recommande à 10000%',
      trad: 'A perfect makeup artist in every way. Attentive and patient, my makeup lasted the whole day and night without any touch-ups. Cloé has amazing talent in both makeup and hairstyling. I highly recommend her 10,000% !',
    },
    {
      nom: 'Laura N.',
      img: '31.jpg',
      txt: "Je ne remercierai jamais assez Cloé pour son écoute et son professionnalisme ! C'est simple, je ne m'étais jamais sentie aussi belle. Mes demoiselles d'honneur et moi-même avons adoré ce moment girly ! Un grand merci Cloé. Nous te souhaitons le meilleur pour la suite.",
      trad: "I can never thank Cloé enough for her attentiveness and professionalism! It's simple, I had never felt so beautiful. My bridesmaids and I loved this girly moment! A big thank you, Cloé. We wish you all the best for the future.",
    },
    {
      nom: 'Léna K.',
      img: '32.jpg',
      txt: 'Cloé a parfaitement écouté et compris ce que je voulais faire comme coiffure et maquillage pour mon mariage ! J’étais super contente du résultat, merci encore  Je recommande vivement !',
      trad: 'Cloé listened perfectly and understood exactly what I wanted for my wedding hairstyle and makeup! I was really happy with the result, thank you again. I highly recommend her!',
    },
    {
      nom: 'Angelina C.',
      img: '33.jpg',
      txt: 'Un grand grand merci pour ce que tu as réalisé samedi pour mes proches et moi même, quel talent ! Merci pour ton professionnalisme, ta passion pour ton métier, et ta gentillesse. Je n’oublierais jamais le regard d’Andreas quand il m’a vu, et qu’il m’a dit que j’étais magnifique. Tout ça c’est grâce à toi. Je te souhaite une belle carrière, je ne doute pas que tu as un bel avenir devant toi. Encore merci ',
      trad: 'A huge thank you for what you did on Saturday for my loved ones and myself, such talent! Thank you for your professionalism, your passion for your craft, and your kindness. I will never forget Andreas’s look when he saw me and told me I looked stunning. All of this is thanks to you. I wish you a wonderful career, I have no doubt you have a bright future ahead of you. Thank you again! ',
    },
    {
      nom: 'Marie L.',
      img: '34.jpg',
      txt: 'Je ne remercierai jamais assez Cloé, qui a su répondre à mes attentes concernant mon maquillage et ma coiffure pour mon mariage ! C’est une personne super professionnelle et très gentille ! Merci mille fois ',
      trad: 'I can never thank Cloé enough for meeting my expectations with my makeup and hairstyle for my wedding! She is a very professional and kind person! A thousand thanks!',
    },
    {
      nom: 'Alice E.',
      img: '22.jpg',
      txt: "Cloe est à l´écoute et attentive à chaque demande. Son travail est incroyable en plus de son professionnalisme, c'est une personne adorable . Malgré le stress du grand jour elle sait détendre et accompagner. Encore merci de m´avoir sublimée pour le plus beau jour de ma vie.",
      trad: 'Cloé is attentive and listens carefully to every request. Her work is incredible, and in addition to her professionalism, she is a lovely person. Despite the stress of the big day, she knows how to relax and support you. Thank you again for making me look beautiful on the most important day of my life.',
    },
  ];
  services = [
    {
      nom: "L'Essai Mariée",
      nom2: 'Bridal beauty preview',
      txt: "Deux heures entièrement consacrées à vous. Ce moment précieux vous permet de vérifier que chaque élément choisi en amont s'harmonise parfaitement avec votre vision. Vous aurez ainsi un premier aperçu de votre apparence le jour de votre mariage.",
      txt2: 'Two hours entirely dedicated to you. This precious time allows you to ensure that every chosen element perfectly aligns with your vision. You will get a first glimpse of your appearance on your wedding day.',
    },
    {
      nom: 'Maquillage et Coiffure de Mariée',
      nom2: 'Bridal makeup & hair',
      txt: "Que ce soit pour le dîner de bienvenue, le grand jour, une séance d'engagement ou le brunch d'adieu, je suis là pour réaliser votre vision avec passion et expertise. Chaque étape de votre mise en beauté est soigneusement pensée pour rendre cette expérience aussi mémorable que les moments que vous garderez précieusement en mémoire.",
      txt2: "Whether it's for the welcome dinner, the big day, an engagement session, or the farewell brunch, I am here to bring your vision to life with passion and expertise. Every step of your beauty preparation is carefully planned to make this experience as memorable as the moments you will cherish forever.",
    },
    {
      nom: 'Invitées',
      nom2: 'Guests',
      txt: 'Pour une préparation très tôt le matin ou un nombre important d’invitées, une maquilleuse ou coiffeuse supplémentaire, rigoureusement sélectionnée par mes soins, sera mise à disposition afin d’assurer un service d’excellence et un professionnalisme constant.',
      txt2: 'For early morning preparations or a large number of guests, an additional makeup artist or hairstylist, carefully selected by me, will be provided to ensure excellent service and consistent professionalism.',
    },
    {
      nom: 'Suivi Mariée',
      nom2: 'Beauty concierge service',
      txt: 'Pour garantir que votre maquillage et votre coiffure demeurent impeccables toute la journée, même après vos larmes de joie, ce service inclut des retouches de maquillage et de coiffure pendant la séance photo, après la cérémonie et/ou avant la réception.',
      txt2: 'To ensure that your makeup and hairstyle remain flawless all day, even after your tears of joy, this service includes touch-ups for both makeup and hair during the photo session, after the ceremony, and/or before the reception.',
    },
  ];
  faq: any = [
    {
      nom: 'ESSAI BEAUTÉ MARIÉE',
      nom2: 'BRIDAL BEAUTY PREVIEW',
      questions: [
        {
          q: 'Puis-je réserver un essai avant de valider la date de mon mariage ?',
          q2: 'Can I book a trial before confirming my wedding date ?',
          a: 'Les essais beauté sont uniquement accessibles aux mariées ayant confirmé leur réservation pour le jour du mariage en signant un devis et en versant un acompte.',
          a2: 'Beauty trials are only available to brides who have confirmed their wedding day booking by signing a quote and paying a deposit.',
        },
        {
          q: 'Quand devrais-je planifier l’essai beauté ?',
          q2: 'When should I schedule the beauty trial?',
          a: 'Je conseille de programmer l’essai 2 à 3 mois avant votre mariage. À ce stade, vous aurez une vision plus précise des détails de votre journée : votre robe, vos bijoux, vos accessoires et l’ensemble de votre esthétique. Avec une idée plus aboutie de votre style de maquillage et de coiffure, nous pourrons garantir un résultat parfaitement en accord avec vos attentes. Ensemble, nous choisirons la date idéale pour s’adapter au mieux à votre emploi du temps.',
          a2: 'I recommend scheduling the trial 2 to 3 months before your wedding. At this stage, you will have a clearer vision of the details of your day: your dress, your jewelry, your accessories, and your overall aesthetic. With a more developed idea of your makeup and hairstyle style, we can ensure a result that perfectly matches your expectations. Together, we will choose the ideal date to best fit your schedule.',
        },
        {
          q: 'Comment dois-je me préparer pour l’essai beauté ?',
          q2: 'How should I prepare for the beauty trial ?',
          a: 'Une fois votre réservation confirmée, un guide beauté vous sera envoyé par email. Ce guide détaillera tous les conseils nécessaires pour préparer vos rendez-vous beauté, aussi bien pour l’essai que pour le jour de votre mariage.',
          a2: 'Once your booking is confirmed, a beauty guide will be sent to you via email. This guide will detail all the necessary tips to prepare for your beauty appointments, both for the trial and for your wedding day.',
        },
        {
          q: 'Combien de maquillages et de coiffures peut-on essayer lors de l’essai beauté ?',
          a: 'Une séance d’essai comprend un maquillage et une coiffure, conformément au service réservé. Si vous souhaitez tester des maquillages ou coiffures supplémentaires, je vous invite à me contacter pour organiser un temps additionnel. Des frais supplémentaires seront appliqués pour couvrir ce temps supplémentaire.',
          q2: 'How many makeup and hairstyle looks can be tried during the beauty trial?',
          a2: 'A trial session includes one makeup and one hairstyle look, as per the reserved service. If you wish to test additional makeup or hairstyle looks, please contact me to arrange additional time. Extra fees will be applied to cover this additional time.',
        },
        {
          q: 'Est-il possible de programmer l’essai beauté le même jour que ma séance d’engagement ?',
          a: 'Cela est envisageable, mais je ne le recommande pas. Lors de l’essai beauté, nous élaborons le look idéal pour votre jour de mariage en tenant compte de votre thème, de votre robe, de vos bijoux et de votre design floral. Il est possible que vous ne souhaitiez pas dévoiler votre look de mariée avant le grand jour. Par ailleurs, le look de mariée et celui d’une séance d’engagement diffèrent, car les tenues et les styles sont adaptés à chaque occasions.',
          q2: 'Is it possible to schedule the beauty trial on the same day as my engagement session?',
          a2: 'This is possible, but I do not recommend it. During the beauty trial, we create the ideal look for your wedding day, taking into account your theme, dress, jewelry, and floral design. You may not want to reveal your bridal look before the big day. Additionally, the bridal look and the engagement session look differ, as the outfits and styles are suited to each occasion.',
        },
      ],
    },
    {
      nom: 'JOUR DU MARIAGE',
      nom2: 'WEDDING DAY',
      questions: [
        {
          q: 'Quelles marques de cosmétiques utilisez-vous ?',
          a: 'J’utilise exclusivement des marques professionnelles et haut de gamme pour garantir une tenue irréprochable tout au long de la journée. Parmi celles-ci figurent Dior, Estée Lauder, Chanel, MAC Cosmetics, Laura Mercier, Westman Atelier ou encore Charlotte Tilbury.',
          q2: 'What cosmetic brands do you use?',
          a2: 'I exclusively use professional and high-end brands to ensure flawless wear throughout the day. These include Dior, Estée Lauder, Chanel, MAC Cosmetics, Laura Mercier, Westman Atelier, and Charlotte Tilbury.',
        },
        {
          q: 'Combien de temps faut-il pour un maquillage et une coiffure complets ?',
          a: 'La réalisation d’un maquillage et d’une coiffure complets pour la mariée nécessite environ 2 heures, en fonction du style souhaité. Pour les demoiselles d’honneur ou les invitées, prévoyez environ 1 heure par personne.',
          q2: 'How long does a full makeup and hairstyle take ?',
          a2: 'A complete makeup and hairstyle for the bride takes approximately 2 hours, depending on the desired style. For bridesmaids or guests, plan around 1 hour per person.',
        },
        {
          q: 'Est-il possible de modifier les services après la réservation ?',
          a: 'Après signature du devis, il est possible de modifier ou d’ajouter des services, mais aucun service ne peut être retiré. Vous pouvez inclure une personne ou un service supplémentaire à tout moment, à condition de prévoir un délai suffisant et de m’en informer rapidement. Si vous hésitez à inclure une personne ou un service dès la réservation initiale, il est conseillé de ne pas l’ajouter immédiatement. En cas de changement du lieu de préparation, les frais de déplacement seront recalculés en fonction du nouvel emplacement.',
          q2: 'Is it possible to modify services after booking?',
          a2: "After signing the quote, it is possible to modify or add services, but no service can be removed. You can add a person or an additional service at any time, provided you give sufficient notice and inform me promptly. If you're unsure about adding a person or service at the time of the initial booking, it is advisable not to add it immediately. If the preparation location changes, travel fees will be recalculated based on the new location.",
        },
      ],
    },
    {
      nom: 'DÉPLACEMENTS',
      nom2: 'TRAVEL',
      questions: [
        {
          q: "Comment s'organisent les déplacements ?",
          q2: 'How are the travel arrangements organized?',
          a: 'Pour vous offrir une expérience fluide et sereine, je me déplace directement sur le lieu de votre préparation où de votre cérémonie pour réaliser les prestations de maquillage et de coiffure. Veuillez noter que des frais de déplacement et, le cas échéant, d’hébergement s’appliquent pour l’essai beauté et le jour du mariage. Si le lieu de préparation se trouve à 2 heures ou plus de route, des frais d’hébergement seront ajoutés. Les frais de déplacement sont fixés à 0,40 € par kilomètre.',
          a2: 'To provide you with a smooth and peaceful experience, I travel directly to the location of your preparation or ceremony to carry out the makeup and hairstyling services. Please note that travel fees and, if applicable, accommodation costs will apply for the beauty trial and on the wedding day. If the preparation location is 2 hours or more away by car, accommodation fees will be added. Travel fees are set at €0.40 per kilometer.',
        },
      ],
    },
    {
      nom: 'RÉSERVATION',
      nom2: 'BOOKING',
      questions: [
        {
          q: 'Combien de temps à l’avance dois-je réserver vos services de maquillage et coiffure pour mon mariage ?',
          q2: 'How far in advance should I book your makeup and hairstyling services for my wedding ?',
          a: 'Je recommande de réserver entre 8 mois et 1 an à l’avance, car mon agenda se remplit rapidement.',
          a2: 'I recommend booking between 8 months to 1 year in advance, as my schedule fills up quickly.',
        },
        {
          q: 'Quel est le processus de réservation ?',
          q2: 'What is the booking process?',
          a: 'Un acompte de 30 % ainsi qu’un devis signé sont nécessaires pour confirmer votre réservation et bloquer la date de votre événement. Le solde devra être réglé par virement bancaire 1 semaine avant le mariage ou en espèces le jour J avant la prestation.',
          a2: 'A 30% deposit along with a signed quote is required to confirm your booking and secure the date of your event. The balance must be paid by bank transfer one week before the wedding or in cash on the day of the event, prior to the service.',
        },
      ],
    },
  ];
  successmail = false;
  avisClicked = 0;
  public innerWidth: any = window.outerWidth;
  public innerHeight: any = window.outerHeight;
  paysage = true;
  bigscreen = false;

  showMenu = false;
  userId: any;

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

    if (!isDevMode()) {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
      }
      this.trackVisit();
    }
  }

  trackVisit() {
    const dataToSend = {
      uuid: this.userId,
    };
    from(
      fetch('http://chiyanh.cluster031.hosting.ovh.net/cloetrack', {
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

  checkIfWrong(field: any) {
    field.wrong = false;
    let value = field.model;
    if (field.nom == this.fields[1].nom) {
      let rgx = /[a-z-A-Z0-9]+@[a-z-A-Z0-9]+/g;
      if (value.length > 0 && !value.match(rgx)) field.wrong = true;
    }
  }

  cantSendMail() {
    return this.fields.find(
      (field: any) => field.required && field.model == ''
    );
  }

  sendMail() {
    console.log('sendmail');
    let msg = '';
    this.fields.forEach((field: any) => {
      field.model = field.model.replace('"', "'");
      msg = msg + field.nom + ' : ' + field.model + ' \r\n';
    });

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
    console.log(dataToSend);
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
      this.successmail = true;
      this.cleanFields();
    });
  }

  cleanFields() {
    this.fields.forEach((f: any) => (f.model = ''));
  }

  openInsta() {
    window.open('https://www.instagram.com/cloe_mua/?hl=fr', '_blank');
  }

  clickMenu(menu: any) {
    this.successmail = false;
    this.showMenu = false;
    var content: any = document.getElementById('middle-content');
    content.style.opacity = 0;

    let int = setInterval(() => {
      this.page = this.topmenu.find((m: any) => m.en == menu)!;
      if (this.page.en == 'About') this.addListener();
      window.scrollTo(0, 0);
      content.style.opacity = 1;
      clearInterval(int);
    }, 600);
  }

  addListener() {
    let inter = setInterval(() => {
      clearInterval(inter);
      const swipeDiv = document.getElementById('swipeDiv');
      console.log(swipeDiv);
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
          startTime = new Date().getTime();
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
        },
        false
      );
    }, 1000);
  }
}
