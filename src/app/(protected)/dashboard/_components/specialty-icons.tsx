import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  Hand,
  Heart,
  Stethoscope,
  Syringe,
  Pill,
  Microscope,
  Scissors,
  Thermometer,
  Dna,
  Waves,
  Droplets,
  Music,
  Flower2,
  Cross,
  Ear,
  UserCog,
  Briefcase,
  Home,
  Timer,
  Scale,
  Beaker,
  Radiation,
  Bug,
  Bandage,
  Scan,
  Milestone,
  Hammer,
  LucideIcon,
} from "lucide-react";

export const getSpecialtyIcon = (specialty: string): LucideIcon => {
  const specialtyLower = specialty.toLowerCase();

  // Especialidades Médicas
  if (specialtyLower.includes("alergo")) return Droplets;
  if (specialtyLower.includes("anestesio")) return Syringe;
  if (specialtyLower.includes("angio")) return Activity;
  if (specialtyLower.includes("cancer") || specialtyLower.includes("oncolog"))
    return Milestone;
  if (specialtyLower.includes("cardiolog")) return Heart;
  if (specialtyLower.includes("cardiovascular")) return Heart;
  if (specialtyLower.includes("cabeça") || specialtyLower.includes("pescoco"))
    return Scissors;
  if (specialtyLower.includes("digestiv")) return Hammer;
  if (specialtyLower.includes("cirurgia geral")) return Scissors;
  if (specialtyLower.includes("cirurgia pediatr")) return Baby;
  if (specialtyLower.includes("cirurgia plastic")) return Hand;
  if (specialtyLower.includes("toracic")) return Activity;
  if (specialtyLower.includes("vascular")) return Activity;
  if (specialtyLower.includes("clinica medica")) return Stethoscope;
  if (specialtyLower.includes("dermatolog")) return Hand;
  if (specialtyLower.includes("endocrino")) return Dna;
  if (specialtyLower.includes("endoscop")) return Scan;
  if (specialtyLower.includes("gastro")) return Hammer;
  if (specialtyLower.includes("geriatr")) return UserCog;
  if (
    specialtyLower.includes("ginecolog") ||
    specialtyLower.includes("obstetri")
  )
    return Baby;
  if (specialtyLower.includes("hemato")) return Droplets;
  if (specialtyLower.includes("hepato")) return Beaker;
  if (specialtyLower.includes("homeopat")) return Flower2;
  if (specialtyLower.includes("infecto")) return Bug;
  if (specialtyLower.includes("masto")) return Hand;
  if (specialtyLower.includes("emergencia")) return Timer;
  if (specialtyLower.includes("esporte")) return Activity;
  if (specialtyLower.includes("trabalho")) return Briefcase;
  if (specialtyLower.includes("familia")) return Home;
  if (specialtyLower.includes("reabilita")) return Activity;
  if (specialtyLower.includes("intensiv")) return Timer;
  if (specialtyLower.includes("legal") || specialtyLower.includes("pericia"))
    return Scale;
  if (specialtyLower.includes("nefro")) return Droplets;
  if (specialtyLower.includes("neurocirurg")) return Brain;
  if (specialtyLower.includes("neurolog")) return Brain;
  if (specialtyLower.includes("nutro") || specialtyLower.includes("nutri"))
    return Thermometer;
  if (specialtyLower.includes("oftalmo")) return Eye;
  if (specialtyLower.includes("ortoped") || specialtyLower.includes("traumato"))
    return Bone;
  if (specialtyLower.includes("otorrino")) return Ear;
  if (specialtyLower.includes("patolog")) return Microscope;
  if (specialtyLower.includes("pediatr")) return Baby;
  if (specialtyLower.includes("pneumo")) return Activity;
  if (
    specialtyLower.includes("psiquiatr") ||
    specialtyLower.includes("psicolog")
  )
    return Brain;
  if (specialtyLower.includes("radiolog")) return Scan;
  if (specialtyLower.includes("radiotera")) return Radiation;
  if (specialtyLower.includes("reumato")) return Bone;
  if (specialtyLower.includes("urolog")) return Droplets;

  // Outras Profissões da Saúde
  if (specialtyLower.includes("fisiotera")) return Activity;
  if (specialtyLower.includes("fono")) return Waves;
  if (specialtyLower.includes("terapia ocupacional")) return Hand;
  if (specialtyLower.includes("odonto")) return Cross;
  if (specialtyLower.includes("educacao fisica")) return Activity;
  if (specialtyLower.includes("enfermagem")) return Bandage;
  if (specialtyLower.includes("farmac")) return Pill;
  if (specialtyLower.includes("biomedic")) return Microscope;
  if (specialtyLower.includes("assistencia social")) return UserCog;
  if (specialtyLower.includes("acupuntura")) return Syringe;
  if (specialtyLower.includes("quiroprax")) return Hand;
  if (specialtyLower.includes("musicoterap")) return Music;
  if (specialtyLower.includes("naturolog")) return Flower2;

  return Stethoscope;
};
