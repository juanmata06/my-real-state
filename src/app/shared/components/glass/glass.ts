import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'glass',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class="px-6 py-20 md:px-20 lg:px-80 flex items-center justify-center backdrop-blur-3xl bg-cover! bg-center! bg-no-repeat!"
            style="background-image: url('https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/signin/signin-glass.jpg')"
        >
            <div class="px-8 md:px-12 lg:px-20 py-12 flex flex-col items-center gap-12 w-full backdrop-blur-2xl rounded-2xl bg-white/10 border border-white/10 max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, perferendis. Itaque nam accusamus repellat? Fugit nisi perferendis repellendus, quaerat temporibus earum magni laborum, deleniti ipsum adipisci voluptatum in pariatur commodi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum unde, sapiente sint odio minima consectetur blanditiis sit similique ex magnam recusandae nulla fuga officia earum, temporibus doloribus? Rerum, natus quidem?
            </div>
        </div>
    `
})
export class Glass {}