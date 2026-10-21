// Confirmed course titles. IDs stay stable across the library and project links.
export const formatLessonTitle = title => title
  .replace(/^L\d+\s+/, '')
  .replace(/^Furniture Refinishing 101\s*-\s*/, '')
  .trim();

const module = (number, title, entries) => ({
  id: `module-${number}`, number, title,
  lessons: entries.map(([id, lessonTitle]) => ({id, title:lessonTitle, displayTitle:formatLessonTitle(lessonTitle), moduleId:`module-${number}`}))
});

export const COURSE_MODULES = [
  module(1,'The $500 Plan',[
    ['m1-welcome','Welcome and Thank You'],
    ['m1-system','The Busy Parent Flip System'],
    ['m1-l1','L1 The $500 Plan']
  ]),
  module(2,'Finding Profitable Furniture',[
    ['m2-l1','L1 Finding Profitable Furniture'],
    ['m2-l2','L2 Using the Deal Scout App'],
    ['m2-l3','L3 Buy This, Not That']
  ]),
  module(3,'Assessing Your Furniture Finds',[
    ['m3-l1','L1 Assessing Your Furniture Finds']
  ]),
  module(4,'Tools, Supplies and Workspace',[
    ['m4-l1','L1 Tools, Supplies and Workspace']
  ]),
  module(5,'Designing for Profit',[
    ['m5-l1','L1 Designing for Profit'],
    ['m5-l2','L2 Current Furniture Trends']
  ]),
  module(6,'Prep Work',[
    ['m6-l1','L1 Prep Work'],
    ['m6-l2','L2 Furniture Refinishing 101 - How to Sand'],
    ['m6-l3','L3 Furniture Refinishing 101 - How to Strip'],
    ['m6-l4','L4 Furniture Refinishing 101 - Filling Damage and Hardware Holes'],
    ['m6-l5','L5 Furniture Refinishing 101 - How to Prime']
  ]),
  module(7,'Finishing Like a Pro',[
    ['m7-l1','L1 Finishing Like a Pro'],
    ['m7-l2','L2 Furniture Refinishing 101 - How to Paint'],
    ['m7-l3','L3 Furniture Refinishing 101 - How to Stain'],
    ['m7-l4','L4 Furniture Refinishing 101 - How to Paintwash']
  ]),
  module(8,'Protecting Your Furniture',[
    ['m8-l1','L1 Protecting Your Furniture'],
    ['m8-l2','L2 Furniture Refinishing 101 - How to Apply Topcoat']
  ]),
  module(9,'The Details that Increase Value',[
    ['m9-l1','L1 The Details that Increase Value'],
    ['m9-l2','L2 Furniture Refinishing 101 - Installing Drawer Liners']
  ]),
  module(10,'Fixing Problems',[
    ['m10-l1','L1 Fixing Problems'],
    ['m10-l2','L2 Furniture Refinishing 101 - How to Fix Drips and Sags'],
    ['m10-l3','L3 Furniture Refinishing 101 - How to Fix Streaks']
  ]),
  module(11,'From Flip to Profit',[
    ['m11-l1','L1 From Flip to Profit']
  ]),
  module(12,'Building Your Flip System',[
    ['m12-l1','L1 Building Your Flip System']
  ])
];

export const LESSONS = Object.fromEntries(COURSE_MODULES.flatMap(courseModule =>
  courseModule.lessons.map(lesson => [lesson.id, {...lesson,moduleNumber:courseModule.number,moduleTitle:courseModule.title}])
));

const recommendation = (id,note) => ({id,note});

export function projectLessons(stage, finish, problems=[]){
  switch(stage){
    case 'Evaluate': return [recommendation('m2-l1'),recommendation('m2-l3'),recommendation('m3-l1')];
    case 'Supplies': return [recommendation('m4-l1')];
    case 'Makeover': return [recommendation('m5-l1'),recommendation('m5-l2')];
    case 'Prep':
      if(finish==='Paint it') return [recommendation('m6-l1'),recommendation('m6-l2','For surface preparation, where sanding is appropriate.'),recommendation('m6-l5','For painted areas when primer is appropriate.')];
      if(finish==='Restore the wood') return [recommendation('m6-l1'),recommendation('m6-l2','For wood surfaces where sanding is appropriate.'),recommendation('m6-l3','For a finish-removal approach, if needed.')];
      return [recommendation('m6-l1'),recommendation('m6-l2','For the painted and exposed-wood areas, where appropriate.'),recommendation('m6-l5','For painted areas when primer is appropriate.'),recommendation('m6-l3','Optional if the exposed wood needs finish removal.')];
    case 'Repair': return problems.includes('Scratches') ? [recommendation('m6-l4','Optional if you find damage or holes that need filling.')] : [];
    case 'Finish':
      if(finish==='Paint it') return [recommendation('m7-l1'),recommendation('m7-l2','For the painted finish.')];
      if(finish==='Restore the wood') return [recommendation('m7-l1'),recommendation('m7-l3','Optional if you choose to add wood color.')];
      return [recommendation('m7-l1'),recommendation('m7-l2','For the painted areas.'),recommendation('m7-l3','Optional for the exposed-wood areas.')];
    case 'Protect': return [recommendation('m8-l1'),recommendation('m8-l2')];
    case 'Style': return [recommendation('m9-l1'),recommendation('m9-l2','Optional finishing detail: drawer liners.')];
    case 'Sell': return [recommendation('m11-l1')];
    default: return [];
  }
}

export const TROUBLESHOOTING_LESSONS = ['m10-l1','m10-l2','m10-l3'];
