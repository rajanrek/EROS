// 'comfi-daily-disposable' ,
//     '1-day-acuvue-moist' ,
//     'dailies-aquacomfort-plus' ,
//     'acuvue-oasys-1-day-with-hydraluxe' ,
//     'acuvue-oasys' ,
//     '1-day-acuvue-moist-for-astigmatism' ,
//     'air-optix-plus-hydraglyde' ,
//     'comfi-colors-enhance' ,
//     'freshlook-colorblends' ,
//     'biofinity-contacts' ,
//     '1-day-acuvue-moist-multifocal' ,
//     'focus-dailies-all-day-comfort' ,
//     'dailies-total-1'
const myArray =  [
    'acuvue' ,
    'air-optix' ,
    'alcon-ciba-vision' ,
    'alcon' ,
    'bausch & Lomb' ,
    'biofinity' ,
    'clariti' ,
    'comfi' ,
    'cooper Vision' ,
    'focus Dailies' ,
    'freshLook' ,
    'myDay' ,
    'bausch-lomb',
    'proclear',
    'daily-contact-lenses' ,
    'monthly-contact-lenses' ,
    'two-weekly-contact-lenses' ,
    'toric-contact-lenses' ,
    'multifocal-contact-lenses' ,
    'coloured-contact-lenses' ,
    'halloween-contact-lenses' ,
    'crazy-contact-lenses' ,
    'cheap-contact-lenses' ,
    'next-day-contact-lenses' ,
    'extended-wear-contact-lenses' ,
    'silicone-hydrogel-contact-lenses' ,
    'no-prescription-contact-lenses',
    'boston',
    'biotrue',
    'comfi',
    'easysept',
    'ote-optics',
    'opti-free',
    'oxysept',
    'renu',
    'total-care',
    'multi-purpose-solutions',
    'saline-solutions',
    'peroxide-solutions',
    'travel-pack-solutions',
    'rigid-gas-permeable-solutions',
    'multi-pack-contact-lens-solutions',
    'altacor',
    'artelac',
    'blink',
    'hycosan',
    'optase',
    'systane',
    'the-body-doctor',
    'the-eye-doctor',
    'thea',
    'eye-drops',
    'eye-accessories',
    'dry-eye-treatments',
    'supplements-hygiene',
    'face-masks',
    'travel-essentials',
    'barbour',
    'chloe',
    'dolce-gabbana',
    'emporio-armani',
    'feel-good-collection',
    'hugo-boss',
    'lacoste',
    'levis',
    'maxmara',
    'oakley',
    'polaroid',
    'prada',
    'ralph-by-ralph-lauren',
    'superdry',
    'versace',
    'calvin-klein',
    'dkny',
    'earth',
    'farah',
    'gucci',
    'jimmy-choo',
    'le-specs',
    'marc-jacobs',
    'michael-kors',
    'oneill',
    'polo-ralph-lauren',
    'radley',
    'ray-ban',
    'tommy-hilfiger',
    'vogue',
    'dunlop',
    'police',
    'linda-farrow',
    'persol',
    'saint-laurent',
    'victoria-beckham',
    'aviator',
    'round',
    'cat-eye'
];
const DeepLinkUrl=(arg)=>{
    console.log("arg",arg)
    let value = arg === undefined ? 'acuvue' : arg
  return  myArray.filter(name => name.toLowerCase().search(value.toLowerCase()) !== -1);
}
export default DeepLinkUrl;