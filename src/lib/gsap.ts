import gsapCore from 'gsap'
import { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsapCore.registerPlugin(ScrollTriggerPlugin)
}

export const gsap = gsapCore
export const ScrollTrigger = ScrollTriggerPlugin
