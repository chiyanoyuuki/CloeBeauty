import { CommonModule } from '@angular/common';
import { Component, HostListener, isDevMode, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, from, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { ScrollAppearDirective } from './scroll-appear.directive';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ScrollAppearDirective, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  @ViewChild('calendar') calendar!: CalendarComponent;

  baseapi = "https://www.cloechaudronbeauty.com/backend/api/";
  topmenu:any;
  galleries:any;
  lists:any;
  fields: any;
  listeavis: any;
  services:any;
  faq:any;
  trads:any;
  domains:any;
  weddings:any;
  photographers:any;
  prestaopened = -1;

  onetoten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  trad = 'fr';

  portfolio: any = [];
  page:any;

  successmail = false;
  avisClicked = 0;
  public innerWidth: any = window.outerWidth;
  public innerHeight: any = window.outerHeight;
  paysage = true;
  bigscreen = false;

  showMenu = false;
  userId: any;
  visibility = true;
  connected = 0;
  lastSentTime: number = 0;
  intervalTrack: any;
  isMobile: boolean = false;

  timeonapage = 0;
  nbmail = 0;
  datesArray:any = [];

  constructor(private http: HttpClient, private renderer: Renderer2) {
    this.lastSentTime = Date.now();
    this.timeonapage = Date.now();
  }

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

  ngOnInit(): void {
    this.loadSiteData();
    this.isMobile = this.isMobileDevice();
    let int = setInterval(() => {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      if (isDevMode()) console.log(this.innerWidth, this.innerHeight);
      if (this.innerHeight > this.innerWidth && this.innerWidth < 600)
        this.paysage = false;

      if (this.innerWidth > 1300) this.bigscreen = true;
      else this.bigscreen = false;
      clearInterval(int);
    }, 500);

      this.http.get<any>(this.baseapi + 'cloeplanningsite.php?artiste=cloe')
      .subscribe(data => {
        this.datesArray = data;
        console.log(this.datesArray);
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

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  }

  getPackages()
  {
    let retour: any = [];
    let mariees = this.services.mariees.fr;
    let invitees = this.services.invitees.fr;

    if(this.trad=="en") 
    {
      mariees = this.services.mariees.en;
      invitees = this.services.invitees.en;
    }

    mariees.forEach((m:any)=>retour.push(m));
    invitees.forEach((i:any)=>retour.push(i));

    return retour;
  }

  sendMail() {
    this.nbmail++;
    if (isDevMode()) console.log('sendmail');
    let msg = '';
    this.fields.forEach((field: any) => {
      field.model = field.model.replace('"', "'");
      console.log(field.trad, field.nom, field.model);
      if (field.model != '')
        msg =
          msg +
          (this.trad == 'fr' ? field.trad : field.nom) +
          ' : ' +
          field.model +
          ' \r\n';
    });

    const dataToSend = {
      from: this.fields[2].model,
      subject: this.fields[0].model + ' - ' + this.fields[4].model,
      message: encodeURIComponent(msg),
    };
    if (isDevMode()) console.log(dataToSend);

    const to = 'cloe.chaudron@outlook.com';
    const subject = dataToSend.subject;
    const body = dataToSend.message;

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }

  cleanFields() {
    this.fields.forEach((f: any) => (f.model = ''));
  }

  openInsta() {
    window.open('https://www.instagram.com/cloe_mua/?hl=fr', '_blank');
  }

  openSite(nb: any) {
    if (nb == 0) {
      window.open(
        'https://www.leblogdemadamec.fr/blog-mariage-lifestyle/mariage-couture-a-labbaye-saint-eusebe/',
        '_blank'
      );
    } else if (nb == 1) {
      window.open('https://www.instagram.com/p/CqBidpiMqcn/', '_blank');
    } else if (nb == 2) {
      window.open('https://caratsandcake.com/wedding/selina-and-nick', '_blank');
    }
  }

  clickMenu(menu: any, scroll:any = 0) {
    const now = Date.now();
    const temps = now - this.timeonapage;
    this.timeonapage = now;
    this.page.temps += temps;

    this.successmail = false;
    this.showMenu = false;
    var content: any = document.getElementById('middle-content');
    content.style.opacity = 0;

    let int = setInterval(() => {
      this.page = this.topmenu.find((m: any) => m.en == menu)!;
      if (this.page.en == 'Home') this.addListener();
      window.scrollTo(0, scroll);
      content.style.opacity = 1;
      const elements = document.querySelectorAll('.enter-from-direction');
      elements.forEach(el => {
        this.renderer.removeClass(el, 'enter-from-direction');
      });
      clearInterval(int);
    }, 600);
  }

  clickPackage(service:any){
    this.clickMenu("Contact", 1300);
    this.fields.find((field:any)=>field.nom=="Desired Package").model = service[1] + " : " + service[2];
  }

  addListener() {
    let inter = setInterval(() => {
      clearInterval(inter);
      const swipeDiv = document.getElementById('swipeDiv');
      if (isDevMode()) console.log(swipeDiv);
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
          if (isDevMode()) console.log('touchstart');
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
          if (isDevMode()) console.log('touchend');
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

  getDomainTrad(i: number): string {
    return this.trads[this.trad]['domain_' + i];
  }

  getWeddingTrad(i: number): string {
    return this.trads[this.trad]['wedding_' + i];
  }

  getPhotographerTrad(i: number): string {
    return this.trads[this.trad]['photographer_' + i];
  }

  openLink(link:any) {
    window.open(link, '_blank');
  }

  loadSiteData() {
    this.http.get<any>('https://www.cloechaudronbeauty.com/backend/api/getccbdata.php').subscribe(res => {
      this.topmenu        = res.topmenu;
      this.galleries      = res.galleries;
      this.lists          = res.lists;
      this.fields         = res.fields;
      this.listeavis      = res.listeavis;
      this.services       = res.services;
      this.faq            = res.faq;
      this.trads          = res.trads;
      this.domains        = res.domains;
      this.weddings       = res.weddings;
      this.photographers  = res.photographers;
      this.portfolio      = res.portfolio;

      this.page = this.topmenu[0];
      this.addListener();
    });
  }

  onDateSelected(event:any)
  {
    this.fields[4].model = event;
  }

  getCalendarMsg()
  {
    if(this.datesArray.some((d:any) =>
        d.date === this.fields[4].model || (d.essai && d.essai === this.fields[4].model)))
    {
      if(this.trad == "fr")
        return "Cette date est déjà en partie réservée, je ferai mon possible pour vous accompagner sous réserve de disponibilité."
      else
        return "This date is already partially booked; I will do my best to accommodate you, subject to availability."
    }
    else
    {
      return "&nbsp;"
    }
  }
}
