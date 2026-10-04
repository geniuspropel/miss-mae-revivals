export const STORAGE_KEY = 'miss-mae-dresser-demo-v2';
export const PROJECT_NAME = 'Mid-Century Dresser';
export const RESALE_LOW = 275;
export const RESALE_HIGH = 375;
export const EXAMPLE_CONSUMABLES = 35;

export const FURNITURE = ['Dresser', 'Nightstands', 'Buffet / Credenza', 'Entry / Sofa Table', 'Cabinet', 'Other'];
export const SOURCES = ['Facebook Marketplace', 'Thrift Store', 'Garage / Estate Sale', 'Curb / Free', 'Already Own It'];
export const FINISHES = ['Paint it', 'Restore the wood', 'Paint + natural wood'];
export const PROBLEMS = ['Scratches', 'Water stains', 'Chipped veneer', 'Loose hardware', 'Sticky drawers', 'Odor'];
export const CHOICE_IMAGES = {Dresser:'dresser',Nightstands:'nightstands','Buffet / Credenza':'buffet','Entry / Sofa Table':'table',Cabinet:'cabinet',Other:'other','Facebook Marketplace':'marketplace','Thrift Store':'thrift','Garage / Estate Sale':'estate','Curb / Free':'curb','Already Own It':'own'};

export const DEFAULT_DEMO = {
  source: 'Facebook Marketplace', price: '40',
  answers: {style:'Mid-century / clean lines',material:'Solid wood or veneer',condition:'Minor cosmetic wear',construction:'Sturdy and stable'},
  finish: 'Paint + natural wood', surface: 'Previously finished wood', problems: ['Scratches'],
  checked: {}, owned: [],
  listing: {askingPrice:'375',dimensions:'',finishColor:'',condition:'',pickup:'',title:'',description:''}
};

export const PRODUCTS = [
  {id:'primer',name:'Oil-based primer',brand:'Zinsser Cover-Stain',note:'Sample option for a painted surface where stain blocking is needed.',url:'https://www.zinsseruk.com/product/cover-stain/',category:'consumable',finishes:['Paint it','Paint + natural wood']},
  {id:'paint',name:'Emerald Urethane Trim Enamel',brand:'Sherwin-Williams',note:'Sample paint option for the painted areas of the dresser.',url:'https://www.sherwin-williams.com/homeowners/products/emerald-urethane-trim-enamel',category:'consumable',finishes:['Paint it','Paint + natural wood']},
  {id:'stain',name:'Oil-based Gel Stain',brand:'General Finishes',note:'Sample wood-color option; test compatibility on the actual piece first.',url:'https://generalfinishes.com/wood-finishes-retail/oil-based-wood-stains-sealers/gel-stains',category:'consumable',finishes:['Restore the wood','Paint + natural wood']},
  {id:'topcoat',name:'Polycrylic Protective Finish',brand:'Minwax',note:'Sample clear protective finish. Confirm compatibility with the chosen finish.',url:'https://www.minwax.com/en/products/protective-finishes/polycrylic-protective-finish',category:'consumable',finishes:FINISHES},
  {id:'sprayer',name:'Flexio 5000 Paint Sprayer',brand:'Wagner',note:'Optional reusable tool for larger painted areas.',url:'https://www.wagnerspraytech.com/product/flexio-series/flexio-5000-sprayer/',category:'equipment',finishes:['Paint it','Paint + natural wood']},
  {id:'sander',name:'Random Orbit Sander',brand:'Bosch',note:'Optional reusable tool for appropriate flat-surface prep.',url:'https://www.boschtools.com/us/en/products/ros10-0601387010',category:'equipment',finishes:FINISHES}
];

const task = (id,label)=>({id,label});
const repairs = {
  'Scratches': task('repair-scratches','Address the selected scratches'),
  'Water stains': task('repair-water','Assess and treat the water stains'),
  'Chipped veneer': task('repair-veneer','Secure or patch the chipped veneer'),
  'Loose hardware': task('repair-hardware','Tighten or replace loose hardware'),
  'Sticky drawers': task('repair-drawers','Adjust the sticky drawers'),
  'Odor': task('repair-odor','Clean and address the odor')
};

const prepByFinish = {
  'Paint it': [task('prep-paint-clean','Clean and inspect the dresser'),task('prep-photo','Photograph the before and note any damage'),task('prep-paint-surface','Prepare the existing surface for paint')],
  'Restore the wood': [task('prep-wood-inspect','Clean and inspect the existing finish and veneer'),task('prep-photo','Photograph the before and note any damage'),task('prep-wood-removal','Choose an appropriate finish-removal approach'),task('prep-wood-sand','Sand carefully where appropriate')],
  'Paint + natural wood': [task('prep-combo-zones','Identify painted and exposed-wood areas'),task('prep-photo','Photograph the before and note any damage'),task('prep-combo-areas','Prepare each area appropriately')]
};
const finishByFinish = {
  'Paint it': [task('finish-paint-prime','Prime where appropriate'),task('finish-paint-coats','Paint in thin coats')],
  'Restore the wood': [task('finish-wood-apply','Apply the selected wood finish')],
  'Paint + natural wood': [task('finish-combo-mask','Mask the boundaries between finishes'),task('finish-combo-apply','Paint selected areas and refinish exposed wood')]
};
const prepInstructions = {
  'Paint it':'Clean the dresser and inspect its existing coating. Photograph any damage, then prepare the surface for paint using a method appropriate to the material and the product you select.',
  'Restore the wood':'Inspect the existing finish and veneer before removing anything. Choose a removal approach suitable for this piece; sand carefully only where the surface allows it.',
  'Paint + natural wood':'Decide which areas will be painted and which will show wood. Inspect and prepare those areas separately before moving into repairs and finishing.'
};
const finishInstructions = {
  'Paint it':'If the surface needs it, use a compatible primer. Apply the chosen paint in thin coats and follow the product instructions for drying between coats.',
  'Restore the wood':'Test the chosen wood finish on an inconspicuous area. Apply it according to the product directions, keeping the veneer and existing surface in mind.',
  'Paint + natural wood':'Mask the transition between the two finishes. Paint the selected areas and refinish the exposed wood using compatible products and the directions on each label.'
};
const finishLesson = {
  'Paint it':'Painting furniture in thin coats',
  'Restore the wood':'Choosing and applying a wood finish',
  'Paint + natural wood':'Combining paint and natural wood'
};

export function getStages(finish, problems){
  const repairTasks = problems.length ? [task('repair-review','Review the selected problem spots'),...problems.map(p=>repairs[p]).filter(Boolean)] : [task('repair-review','Confirm no repairs are needed')];
  return [
    {name:'Evaluate',kicker:'Know your piece',tasks:[task('evaluate-assessment','Complete the Buy This, Not That assessment')],instructions:'Review style, material, condition, and construction before deciding whether the dresser is worth your time.',tip:'open every drawer and inspect the whole piece before committing.',lesson:'How to spot a flip worth buying',time:'15–20 min'},
    {name:'Prep',kicker:'A clean start',tasks:prepByFinish[finish],instructions:prepInstructions[finish],tip:'clean and inspect before sanding so residue and damage are easier to spot.',lesson:'Preparing a dresser for refinishing',time:'30–60 min'},
    {name:'Repair',kicker:'Fix what you found',tasks:repairTasks,instructions:problems.length?`Work only on the problem spots you selected: ${problems.join(', ').toLowerCase()}. Reassess the piece if a repair is more extensive than expected.`:'Check that the piece needs no repair work before continuing.',tip:'prioritize problems that affect daily use or the final appearance.',lesson:'Handling common dresser repairs',time:'Varies by repair'},
    {name:'Finish',kicker:'The transformation',tasks:finishByFinish[finish],instructions:finishInstructions[finish],tip:'test products first and follow their coat thickness and drying directions.',lesson:finishLesson[finish],time:'1–2 hrs active'},
    {name:'Protect',kicker:'Make it last',tasks:[task('protect-cure','Protect if appropriate and allow curing')],instructions:'Decide whether the selected finish calls for a compatible protective coat. Follow the product directions and allow adequate curing before use.',tip:'dry to the touch may not mean ready for daily use.',lesson:'Choosing a protective finish',time:'20–40 min active'},
    {name:'Style',kicker:'The final details',tasks:[task('style-hardware','Clean and reinstall hardware'),task('style-stage','Stage the dresser'),task('style-photos','Take clear photos in natural light')],instructions:'Clean the hardware, stage simply, and photograph the actual condition from several angles. Include any imperfections in the photos.',tip:'keep props simple so buyers can see the dresser clearly.',lesson:'Staging and photographing a finished piece',time:'20–30 min'},
    {name:'Sell',kicker:'Ready for its next home',tasks:[task('sell-quality','Complete a final quality check'),task('sell-listing','Review and verify the listing details'),task('sell-price','Set the asking price')],instructions:'Use the sample figures as a starting point, verify every detail in the draft, and set an asking price you are comfortable with.',tip:'include measured dimensions and describe any flaws honestly.',lesson:'Pricing and writing a listing',time:'20–30 min'}
  ];
}

export function getScore(answers,purchase=40){
  const pricePenalty=purchase>350?38:purchase>250?25:purchase>150?8:0;
  return Math.max(20,Math.min(95,82-pricePenalty + (answers.style==='Very ornate / niche'?-8:0) + (answers.material==='Quality laminate'?-8:0) + (answers.material==='Particle board / MDF'?-26:0) + (answers.condition==='Some repair needed'?-9:0) + (answers.condition==='Major repairs needed'?-28:0) + (answers.construction==='Needs a little tightening'?-8:0) + (answers.construction==='Wobbly or damaged'?-30:0)));
}
export function getConcerns(answers){
  return [answers.material==='Particle board / MDF'?'poor material':null,answers.condition==='Major repairs needed'?'major repairs':null,answers.construction==='Wobbly or damaged'?'unstable construction':null].filter(Boolean);
}
export function formatMoney(value){return value<0?`-$${Math.abs(value)}`:`$${value}`;}
export function finishWording(finish){return {'Paint it':'a painted finish','Restore the wood':'a restored wood finish','Paint + natural wood':'a combination of painted surfaces and natural wood'}[finish];}
export function repairSupplyNames(problems){
  const map={'Scratches':'Scratch repair material','Water stains':'Materials appropriate for water-stain treatment','Chipped veneer':'Veneer repair adhesive or patch','Loose hardware':'Replacement screws or hardware','Sticky drawers':'Drawer glide treatment','Odor':'Odor-cleaning supplies'};
  return problems.map(p=>map[p]).filter(Boolean);
}
