import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  topmenu = [
    { nom: 'Home', active: true },
    { nom: 'About', active: true },
    { nom: 'Portfolio' },
    { nom: 'Services' },
    { nom: 'Contact', active: true },
  ];
  page = this.topmenu[0];
  galleries = [
    [
      { text: 'Meet', italic: 'the artist', img: '1.jpg' },
      { text: 'Discover', italic: 'my services', img: '2.jpg' },
      { text: 'Explore', italic: 'the gallery', img: '3.jpeg' },
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
    },
    {
      model: '',
      required: true,
      nom: 'Email address',
      type: 'input',
      placeholder: 'johndoe@gmail.com..',
    },
    {
      model: '',
      nom: 'Phone number',
      type: 'input',
      required: true,
      placeholder: '06.50.05.06.50',
    },
    {
      model: '',
      nom: 'Occasion',
      required: true,
      type: 'input',
      placeholder: 'Wedding, Special event, Musical Clip..',
    },
    {
      model: '',
      nom: 'Date of the event (DD-MM-YYYY)',
      type: 'input',
      required: true,
      placeholder: '25-01-2045..',
    },
    {
      model: '',
      nom: 'Headcount & requested services',
      type: 'input',
      placeholder: '3 make up + hairstyle, 1 only hairstyle..',
    },
    {
      model: '',
      nom: 'Time everyone have to be ready by',
      type: 'input',
      placeholder: '20min max/head..',
    },
    {
      model: '',
      required: true,
      nom: 'Getting ready location or venue',
      type: 'input',
      placeholder: '125 ter Avenue des champs blancs..',
      big: false,
    },
    {
      model: '',
      nom: 'Your message',
      type: 'textarea',
      placeholder:
        "Please feel free to share as much information as possible about your wedding day. The more I know about your vision, style, and specific requests, the better I can understand your needs and create a look that's perfect for you. I can't wait to hear all about your plans!",
      huge: true,
    },
  ];
  listeavis = [
    {
      nom: 'Laura G.',
      img: '1.jpg',
      txt: "Merci à Cloé pour son professionnalisme. Elle a maquillé ma témoin, ma maman et moi à l'occasion de mon mariage et elle a su largement répondre à nos attentes. Nous étions ravies du résultats et de son travail très professionnel. Je vous recommande vivement les talents de Cloé.",
    },
    {
      nom: 'Alice E.',
      img: '11.jpg',
      txt: "Cloe est à l´écoute et attentive à chaque demande. Son travail est incroyable en plus de son professionnalisme, c'est une personne adorable . Malgré le stress du grand jour elle sait détendre et accompagner. Encore merci de m´avoir sublimée pour le plus beau jour de ma vie.",
    },
    {
      nom: 'Magalie M.',
      img: '2.jpg',
      txt: "Maquilleuse et coiffeuse très professionnelle qui a du talent . J'ai faite appel à ses services car on m'a lâché subitement , elle m'a sauvée la vie . Chaleureuse, très professionnelle, à l'écoute une personne de confiance qui donne de très bons conseils . Je la recommande sans hésiter une coiffure et un maquillage très réussie encore merci pour tout .je vous souhaite une bonne continuation.",
    },
  ];
  avisClicked = 0;
  public innerWidth: any = window.outerWidth;
  public innerHeight: any = window.outerHeight;
  paysage = true;

  showMenu = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight;
    this.innerWidth = event.target.innerWidth;

    if (
      event.target.innerHeight > event.target.innerWidth &&
      event.target.innerWidth < 500
    )
      this.paysage = false;
    else this.paysage = true;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.innerHeight, this.innerWidth);
    if (this.innerHeight > this.innerWidth && this.innerWidth < 500)
      this.paysage = false;
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
    this.page = menu;
    this.showMenu = false;
    window.scrollTo(0, 0);
  }
}
