import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MemberDTO } from '../../DTOs/member/MemberDTO';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgxGalleryModule ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  providers: [MemberService]
})

export class MemberDetailComponent implements OnInit
{
  member : MemberDTO;

  galleryOptions : NgxGalleryOptions[];
  galleryImages : NgxGalleryImage[];

  constructor(private memberService : MemberService, private route : ActivatedRoute)
  {

  }

  ngOnInit(): void 
  {
    this.LoadMember();

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

  }

  getImages() 
  {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push
      ({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }

    return imageUrls;
  }


  LoadMember()
  {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

}
