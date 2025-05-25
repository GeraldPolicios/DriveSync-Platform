import { Service, Mechanic, Workshop } from '../types';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

const services: Service[] = [
  {
    id: '1',
    name: 'Oil Change',
    description: 'Complete oil change with premium quality oil and new filter',
    price: 2500,
    requiresWorkshop: false,
    vehicleType: 'both',
    image: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1024/https://www.wyotech.edu/wp-content/uploads/2024/04/how-to-change-your-car-oil-featured-image.jpeg'
  },
  {
    id: '2',
    name: 'Tire Change',
    description: 'Replace tires with new ones or repair punctures',
    price: 2500,
    requiresWorkshop: false,
    vehicleType: 'both',
    image: 'https://cdn.customcompleteautomotive.com/images/blog/2022/march/03-09-22/how-to-change-a-flat-tire-in-10-simple-steps.jpeg'
  },
  {
    id: '3',
    name: 'Battery Replacement',
    description: 'Install a new battery and properly dispose of the old one',
    price: 3000,
    requiresWorkshop: false,
    vehicleType: 'both',
    image: 'https://cdn.hswstatic.com/gif/replace-car-battery-1.jpg'
  },
  {
    id: '4',
    name: 'Brake Service',
    description: 'Inspect and replace brake pads, rotors, or drum brakes as needed',
    price: 2000,
    requiresWorkshop: true,
    vehicleType: '4-wheel',
    image: 'https://media.istockphoto.com/id/522394158/photo/car-service-procedure.jpg?s=612x612&w=0&k=20&c=SXPyg7yMw0Uc4LuI59lchMouvjJ3z6r5oNKO7mdnHCc='
  },
  {
    id: '5',
    name: 'Diagnostic Scan',
    description: 'Complete computer diagnostic to identify issues',
    price: 3500,
    requiresWorkshop: false,
    vehicleType: '4-wheel',
    image: 'https://imgcdnblog.carmudi.com.ph/carmudi-ph/wp-content/uploads/2019/01/18175852/1929020_1150316593918_5773225_n.jpg'
  },
  {
    id: '6',
    name: 'Chain Lubrication',
    description: 'Clean and lubricate motorcycle chain for smoother operation',
    price: 200,
    requiresWorkshop: false,
    vehicleType: 'motorcycle',
    image: 'https://www.tru-tension.com/wp-content/uploads/BananaSlip-Chain-Lube-Image-Two.jpg'
  },
  {
    id: '7',
    name: 'Injector cleaning',
    description: 'Clean and lubricate injector for smoother function',
    price: 650,
    requiresWorkshop: false,
    vehicleType: 'motorcycle',
    image: 'https://cdn.shopify.com/s/files/1/0762/7194/3984/files/2.-how-to-clean-motorcycle-fuel-injectors.jpg?v=1700576396'
  },
  {
    id: '8',
    name: 'Fork Oil maintenance',
    description: 'Maintaining suspension fork oil to prevent rusting and provide smoother ride',
    price: 1200,
    requiresWorkshop: false,
    vehicleType: 'motorcycle',
    image: 'https://www.bikesmedia.in/uploads/image/reviews/2015/may/motorcycle-fork-oil.jpg'
  },
  {
    id: '9',
    name: 'Replace hub bearing',
    description: '.',
    price: 600,
    requiresWorkshop: false,
    vehicleType: 'motorcycle',
    image: 'https://www.datocms-assets.com/119921/1714526095-how-to-remove-and-replace-motorcycle-wheel-bearings_09.jpg?auto=format&w=800'
  },
  {
    id: '10',
    name: 'Air filter replacement',
    description: '.',
    price: 350,
    requiresWorkshop: false,
    vehicleType: 'motorcycle',
    image: 'https://static.vecteezy.com/system/resources/previews/007/135/613/large_2x/mechanic-holding-dirty-engine-air-filter-over-motorcycle-working-in-motorcycle-garage-repair-service-and-maintenance-concept-free-photo.jpg'
  },
   {
    id: '11',
    name: 'Aircon diagnostics',
    description: '.',
    price: 2200,
    requiresWorkshop: false,
    vehicleType: '4-wheels',
    image: 'https://www.shutterstock.com/image-photo/repairman-holding-monitor-tool-check-600nw-2279387293.jpg'
  },
  {
    id: '12',
    name: 'Radiator flush',
    description: '.',
    price: 2800,
    requiresWorkshop: false,
    vehicleType: '4-wheels',
    image: 'https://cdn.customcompleteautomotive.com/images/blog/2023/june/06-14-23/top-3-benefits-of-a-radiator-flush.jpeg'
  }
];

const mechanics: Mechanic[] = [
  {
    id: '1',
    name: 'Mechanic 1',
    image: 'https://www.autotrainingcentre.com/wp-content/uploads/2015/06/automotive-service-advisor.png',
    specialty: 'Engine Specialist',
    rating: 4.8,
    available: true,
    location: [14.5995, 120.9842], // Manila coordinates
    servicesOffered: ['1', '2', '3'],
    vehicleExpertise: ['4-wheel', 'motorcycle'],
    experience: 8
  },
  {
    id: '2',
    name: 'Mechanic 2',
    image: 'https://www.mycar.com.au/media/blog/Mechanic-careers.jpg',
    specialty: 'Motorcycle Expert',
    rating: 4.6,
    available: true,
    location: [14.6091, 120.9762], // Near Manila
    servicesOffered: ['1', '2', '6'],
    vehicleExpertise: ['motorcycle'],
    experience: 5
  },
  {
    id: '3',
    name: 'Mechanic 3',
    image: 'https://www.shutterstock.com/image-photo/asian-mechanic-writing-something-on-600nw-2081615425.jpg',
    specialty: 'Electrical Systems',
    rating: 4.9,
    available: false,
    location: [14.5547, 121.0244], // Makati coordinates
    servicesOffered: ['3', '5'],
    vehicleExpertise: ['4-wheel'],
    experience: 10
  }
];

const workshops: Workshop[] = [
  {
    id: '1',
    name: 'AutoMax Workshop',
    location: 'Quezon City, Metro Manila',
    contact: '+63 912 345 6789',
    services: ['1', '2', '3', '4', '5'],
    verified: true
  },
  {
    id: '2',
    name: 'MotoTech Garage',
    location: 'Makati City, Metro Manila',
    contact: '+63 923 456 7890',
    services: ['1', '2', '3', '6'],
    verified: true
  },
  {
    id: '3',
    name: 'SuperFix Auto Center',
    location: 'Pasig City, Metro Manila',
    contact: '+63 934 567 8901',
    services: ['1', '2', '3', '4', '5'],
    verified: true
  }
];

export const initializeData = (): void => {
  // Check if data already exists in localStorage
  if (!getLocalStorageItem('services')) {
    setLocalStorageItem('services', services);
  }
  
  if (!getLocalStorageItem('mechanics')) {
    setLocalStorageItem('mechanics', mechanics);
  }
  
  if (!getLocalStorageItem('workshops')) {
    setLocalStorageItem('workshops', workshops);
  }
  
  if (!getLocalStorageItem('bookings')) {
    setLocalStorageItem('bookings', []);
  }
  
  if (!getLocalStorageItem('reviews')) {
    setLocalStorageItem('reviews', []);
  }
  
  if (!getLocalStorageItem('messages')) {
    setLocalStorageItem('messages', []);
  }
};