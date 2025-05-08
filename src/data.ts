import { Service, Testimonial, SuccessStory } from './types';
import { Briefcase, Shield, LineChart, GraduationCap, TrendingUp, PieChart } from 'lucide-react';

export const services: Service[] = [
  {
    id: 'insurance',
    title: 'Insurance Services',
    description: 'Comprehensive insurance solutions tailored to protect your future.',
    icon: 'Shield',
    features: ['Life Insurance', 'Health Insurance', 'Vehicle Insurance', 'Investment-Linked Plans']
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds',
    description: 'Strategic investment solutions for long-term wealth creation.',
    icon: 'LineChart',
    features: ['SIP Plans', 'Equity Funds', 'Debt Funds', 'Hybrid Funds']
  },
  {
    id: 'wealth-management',
    title: 'Wealth Management',
    description: 'Personalized strategies for optimal financial growth.',
    icon: 'Briefcase',
    features: ['Financial Planning', 'Asset Allocation', 'Risk Management', 'Estate Planning']
  },
  {
    id: 'financial-education',
    title: 'Financial Education',
    description: 'Empowering clients with financial knowledge and insights.',
    icon: 'GraduationCap',
    features: ['Webinars', 'Workshops', 'Online Courses', 'Personal Coaching']
  },
  {
    id: 'stock-advisory',
    title: 'Stock Market Advisory',
    description: 'Expert guidance for stock market investments.',
    icon: 'TrendingUp',
    features: ['Portfolio Analysis', 'Stock Recommendations', 'Market Research', 'Risk Assessment']
  },
  {
    id: 'portfolio-management',
    title: 'Portfolio Management',
    description: 'Professional management of your investment portfolio.',
    icon: 'PieChart',
    features: ['Portfolio Optimization', 'Regular Monitoring', 'Performance Reports', 'Rebalancing']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Atul Jugal Agarwal',
    role: 'Portfolio Management & Returns',
    content: 'I had no idea how to manage my investments properly until I connected with them. Their expert advice not only diversified my portfolio but also helped me achieve 18% annual returns, consistently beating market averages.In just 2 years, I’ve seen my money work harder and smarter. Highly professional and transparent advice.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 5
  },
  {
    id: '2',
    name: 'Tarun Mohnot',
    role: 'Smart Insurance That Builds Wealth',
    content: 'I always thought insurance was just an expense. But they introduced me to a market-linked ULIP that gave me life cover and solid returns—over 14% in 3 years! It’s reassuring to know my money is growing while my family is protected.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 5
  },
  {
    id: '3',
    name: 'Aman rathi',
    role: 'IPO Picks That Actually Deliver',
    content: "I followed their IPO recommendations in 2023 and 2024. Two of those are already up over 40%! As someone new to the stock market, their step-by-step guidance made it all feel simple and safe. I wish I had started earlier.",
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    rating: 5
  },
  {
    id: '4',
    name: 'Priya Jain',
    role: 'Diversification That Feels Safe and Smart',
    content: 'I used to keep everything in savings accounts and FDs. With their help, I now invest in gold ETFs, REITs, and debt funds—without feeling overwhelmed. My portfolio is now stable, diversified, and I finally feel like a smart investor, not just a saver.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5
  },
  {
    id: '5',
    name: 'Anita Deshmukh',
    role: 'Peace of Mind with Insurance', 
    content: 'I used to buy insurance randomly from agents without knowing what I really needed. They helped me choose the right term plan and a comprehensive health policy, eliminating overlaps and cutting unnecessary costs. Now I have better coverage and real peace of mind about emergencies and the future.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5
  },
  {
    id: '6',
    name: 'Rahul Mishra',
    role: 'End-to-End Financial Confidence',
    content: 'From tax-saving mutual funds and SIPs to the right insurance mix and IPO alerts—they’ve handled every aspect of my finances with clarity and care. I finally feel confident about my financial future and no longer stressed about money decisions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5
  }
];

export const successStories: SuccessStory[] = [
  {
    id: '1',
    title: 'Retirement Portfolio Optimization',
    description: 'Helped a client achieve their retirement goals through strategic asset allocation and risk management.',
    results: [
      { label: 'Portfolio Growth', value: '127%' },
      { label: 'Risk Reduction', value: '35%' },
      { label: 'Annual Returns', value: '18.5%' }
    ],
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800'
  },
  {
    id: '2',
    title: 'Business Succession Planning',
    description: 'Developed a comprehensive succession plan for a family-owned business ensuring smooth transition.',
    results: [
      { label: 'Tax Savings', value: '42%' },
      { label: 'Business Value', value: '₹150M' },
      { label: 'Transition Time', value: '12 months' }
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800'
  }
];