import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface Product {
  name: string;
  brand: string;
  score: number;
  scoreLabel: string;
  scoreColor: string;
  seedOils: string;
  additiveFree: string;
  organic: string;
  oliverSays: string;
  img: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';

  avatars = [
    'https://i.pravatar.cc/40?img=1',
    'https://i.pravatar.cc/40?img=2',
    'https://i.pravatar.cc/40?img=3',
    'https://i.pravatar.cc/40?img=4',
  ];

  products: Product[] = [
    {
      name: "Honey Mama's Cacao Truffle Bar",
      brand: "Honey Mama's",
      score: 88,
      scoreLabel: 'Great',
      scoreColor: '#4caf50',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'No',
      oliverSays: 'A clean treat made with whole-food ingredients. No refined sugars or harmful additives — a win for the whole family!',
      img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=200&h=260&fit=crop',
    },
    {
      name: 'Immune Support Wellness Drink',
      brand: 'GreenLeaf',
      score: 74,
      scoreLabel: 'Good',
      scoreColor: '#8bc34a',
      seedOils: 'Trace',
      additiveFree: 'Partial',
      organic: 'Yes',
      oliverSays: 'Decent ingredients with a few additives. Good as an occasional boost, but check the sugar content before making it daily.',
      img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=200&h=260&fit=crop',
    },
    {
      name: 'Strawberry Vanilla Sparkling Tonic',
      brand: 'Olipop',
      score: 100,
      scoreLabel: 'Excellent',
      scoreColor: '#2d9e2d',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'Yes',
      oliverSays: "This drink's high score is thanks to simple wholesome ingredients like strawberry juice and natural fibers, with no harmful additives or processed sugars — a great treat for kids!",
      img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=260&fit=crop',
    },
    {
      name: 'Almond Flour Crackers, Sea Salt',
      brand: 'Simple Mills',
      score: 91,
      scoreLabel: 'Excellent',
      scoreColor: '#2d9e2d',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'No',
      oliverSays: 'Grain-free and made with almond flour — these crackers pack fibre and healthy fats without any junk. A pantry staple!',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=260&fit=crop',
    },
    {
      name: 'Blueberry Cashew Granola Bars',
      brand: 'Kind Bar',
      score: 79,
      scoreLabel: 'Good',
      scoreColor: '#8bc34a',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'Yes',
      oliverSays: 'Wholesome nuts and real fruit with no artificial anything. A solid on-the-go snack that keeps kids satisfied without the sugar crash.',
      img: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/d7cc76bb-99f5-4518-8811-0412d4b72fae.__CR0,0,970,600_PT0_SX970_V1___.jpg',
    },
    {
      name: 'Organic Canned Black Beans',
      brand: 'Eden Foods',
      score: 95,
      scoreLabel: 'Excellent',
      scoreColor: '#2d9e2d',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'Yes',
      oliverSays: 'Pure, simple, and packed with fibre and plant protein. BPA-free can, zero additives — as clean as pantry staples get.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkbnEvxRLdpxHwGOT8t83llojmaq5vNGeJA&s',
    },
    {
      name: 'Grass-Fed Whole Milk Yogurt',
      brand: 'Stonyfield',
      score: 86,
      scoreLabel: 'Great',
      scoreColor: '#4caf50',
      seedOils: 'None',
      additiveFree: 'Yes',
      organic: 'Yes',
      oliverSays: 'Rich in probiotics and calcium. Grass-fed and organic means better nutrient profile. Watch for added sugar in flavoured varieties.',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=260&fit=crop',
    },
    {
      name: 'Organic Gummy Bears',
      brand: 'SmartSweets',
      score: 52,
      scoreLabel: 'Fair',
      scoreColor: '#ff9800',
      seedOils: 'None',
      additiveFree: 'Partial',
      organic: 'Yes',
      oliverSays: 'Lower sugar than conventional gummies, but still contains some artificial sweeteners. Fine occasionally, just not every day.',
      img: 'https://m.media-amazon.com/images/I/81AIgzZJAVL._AC_UF894,1000_QL80_.jpg',
    },
  ];

  activeIndex = 2;
  private rotationIntervalId?: number;

  readonly ITEM_W_SIDE = 72;
  readonly ITEM_H_SIDE = 90;
  readonly ITEM_W_ACTIVE = 106;
  readonly ITEM_H_ACTIVE = 126;
  readonly GAP = 8;
  readonly PHONE_WIDTH = 266; // inner width of phone (290px - 2*14px padding handled by strip-outer)

  get stripTranslateX(): number {
    const center = this.PHONE_WIDTH / 2;
    let x = this.GAP;
    for (let i = 0; i < this.products.length; i++) {
      const w = i === this.activeIndex ? this.ITEM_W_ACTIVE : this.ITEM_W_SIDE;
      if (i === this.activeIndex) {
        return x + w / 2 - center;
      }
      x += w + this.GAP;
    }
    return 0;
  }

  get activeProduct(): Product {
    return this.products[this.activeIndex];
  }

  get additiveBadgeClass(): string {
    return this.badgeClass(this.activeProduct.additiveFree);
  }

  get organicBadgeClass(): string {
    return this.badgeClass(this.activeProduct.organic);
  }

  get seedOilsBadgeClass(): string {
    return this.badgeClass(this.activeProduct.seedOils);
  }

  badgeClass(val: string): string {
    if (val === 'None' || val === 'Yes') return 'badge-green';
    if (val === 'Trace' || val === 'Partial') return 'badge-yellow';
    return 'badge-blue';
  }

  ngOnInit(): void {
    this.rotationIntervalId = window.setInterval(() => this.rotateNextProduct(), 3000);
  }

  ngOnDestroy(): void {
    if (this.rotationIntervalId !== undefined) {
      window.clearInterval(this.rotationIntervalId);
    }
  }

  rotateNextProduct(): void {
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
  }

  setActive(index: number): void {
    if (this.rotationIntervalId !== undefined) {
      window.clearInterval(this.rotationIntervalId);
    }
    this.activeIndex = index;
    this.rotationIntervalId = window.setInterval(() => this.rotateNextProduct(), 3000);
  }
}