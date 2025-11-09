import { promises as fs } from "fs";
import path from "path";
import type {
  SiteSettingsDb,
  BannersDb,
  NavigationDb,
  CarouselDb,
  AdsDb,
} from "./dbTypes";

// --------------------------------------------------
// Genel yardımcılar
// --------------------------------------------------
const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(DATA_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json, "utf-8");
}

// --------------------------------------------------
// Site Settings
// --------------------------------------------------
const SITE_SETTINGS_FILE = "siteSettings.json";

export async function readSiteSettings(): Promise<SiteSettingsDb> {
  return readJsonFile<SiteSettingsDb>(SITE_SETTINGS_FILE);
}

export async function writeSiteSettings(db: SiteSettingsDb): Promise<void> {
  await writeJsonFile<SiteSettingsDb>(SITE_SETTINGS_FILE, db);
}

// --------------------------------------------------
// Banners
// --------------------------------------------------
const BANNERS_FILE = "banners.json";

export async function readBanners(): Promise<BannersDb> {
  return readJsonFile<BannersDb>(BANNERS_FILE);
}

export async function writeBanners(db: BannersDb): Promise<void> {
  await writeJsonFile<BannersDb>(BANNERS_FILE, db);
}

// --------------------------------------------------
// Navigation
// --------------------------------------------------
const NAVIGATION_FILE = "navigation.json";

export async function readNavigation(): Promise<NavigationDb> {
  return readJsonFile<NavigationDb>(NAVIGATION_FILE);
}

export async function writeNavigation(db: NavigationDb): Promise<void> {
  await writeJsonFile<NavigationDb>(NAVIGATION_FILE, db);
}

// --------------------------------------------------
// Carousel
// --------------------------------------------------
const CAROUSEL_FILE = "landingCarousel.json";

export async function readCarousel(): Promise<CarouselDb> {
  return readJsonFile<CarouselDb>(CAROUSEL_FILE);
}

export async function writeCarousel(db: CarouselDb): Promise<void> {
  await writeJsonFile<CarouselDb>(CAROUSEL_FILE, db);
}

// --------------------------------------------------
// Ads
// --------------------------------------------------
const ADS_FILE = "adsBelowLanding.json";

export async function readAds(): Promise<AdsDb> {
  return readJsonFile<AdsDb>(ADS_FILE);
}

export async function writeAds(db: AdsDb): Promise<void> {
  await writeJsonFile<AdsDb>(ADS_FILE, db);
}

// ----------------------------------------------------------------------------------------------------

type DbKind = "siteSettings" | "banners" | "navigation" | "carousel" | "ads";

export async function readDb(kind: DbKind) {
  switch (kind) {
    case "siteSettings":
      return readSiteSettings();
    case "banners":
      return readBanners();
    case "navigation":
      return readNavigation();
    case "carousel":
      return readCarousel();
    case "ads":
      return readAds();
  }
}

export async function writeDb(kind: DbKind, payload: unknown) {
  switch (kind) {
    case "siteSettings":
      return writeSiteSettings(payload as SiteSettingsDb);
    case "banners":
      return writeBanners(payload as BannersDb);
    case "navigation":
      return writeNavigation(payload as NavigationDb);
    case "carousel":
      return writeCarousel(payload as CarouselDb);
    case "ads":
      return writeAds(payload as AdsDb);
  }
}
