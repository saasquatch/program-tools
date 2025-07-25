import { Component, h, Host, State } from "@stencil/core";
import { BrandingConfiguration } from "../../saasquatch";
import * as Themes from "./Themes";

const LOCAL_STORAGE_BRAND_KEY = "localStorageBrandKey";
const LOCAL_STORAGE_BRAND_CONFIG_KEY = "localStorageBrandConfigKey";

@Component({
  tag: "sqm-brand-selector",
  shadow: false,
})
export class SqmBrandSelector {
  @State() selectedBrand: string = "Netflix";

  constructor() {
    const storedBrand = localStorage.getItem(LOCAL_STORAGE_BRAND_KEY);
    const initialBrandName = storedBrand;

    this.selectedBrand = initialBrandName;

    // Initialize window.SquatchBrandingConfig based on the loaded brand
    const initialConfig =
      Themes[initialBrandName as keyof typeof Themes] || Themes.Netflix;

    window.SquatchBrandingConfig = initialConfig;
    const event = new CustomEvent("brandingConfigUpdated", {
      detail: window.SquatchBrandingConfig,
    });
    window.dispatchEvent(event);
  }

  componentDidLoad() {
    const storedBrand = localStorage.getItem(LOCAL_STORAGE_BRAND_KEY);
    const initialBrandName = storedBrand;

    this.selectedBrand = initialBrandName;
  }

  disconnectedCallback() {}

  private brands = [
    {
      name: "Netflix",
      logoUrl:
        "https://res.cloudinary.com/saasquatch-staging/image/upload/v1750803365/netflix_ftjbrr.png",
    },
    {
      name: "Amazon",
      logoUrl:
        "https://res.cloudinary.com/saasquatch-staging/image/upload/v1750803366/amazon_mc22fr.png",
    },
    {
      name: "Spotify",
      logoUrl:
        "https://res.cloudinary.com/saasquatch-staging/image/upload/v1750803510/spotify_j5qi1r.png",
    },
    {
      name: "Google",
      logoUrl:
        "https://res.cloudinary.com/saasquatch-staging/image/upload/v1750803168/pngimg.com_-_google_PNG19644_jvypwl.png",
    },
  ];

  private updateBrand(brandName: string) {
    this.selectedBrand = brandName;
    const configToSet: BrandingConfiguration =
      Themes[brandName as keyof typeof Themes] || Themes.Netflix;
    const brandConfigString = JSON.stringify(configToSet);

    localStorage.setItem(LOCAL_STORAGE_BRAND_KEY, brandName);
    localStorage.setItem(LOCAL_STORAGE_BRAND_CONFIG_KEY, brandConfigString);

    window.SquatchBrandingConfig = configToSet;
    window.location.reload();

    const event = new CustomEvent("brandingConfigUpdated", {
      detail: window.SquatchBrandingConfig,
    });
    window.dispatchEvent(event);
  }

  render() {
    return (
      <Host>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          :host {
            display: block; /* Ensure the custom element itself is a block-level element */
            font-family: 'Inter', sans-serif;
          }

          .card-container {
            background-color: #fff !important; 
            border-radius: 18px; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); 
            width: 100%;
            max-width: 350px;
            overflow: hidden;
            padding: 10px;
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 999999;
            border: 1px solid #ccc;
            margin: 10px;
          }

          .card-heading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 10px;
            color: black;
            margin: 0;
            font-size: 16px;
          }

          .segmented-control-container {
            display: flex;
            background-color: #e5e7eb !important; 
            border-radius: 9999px; 
            padding: 0.25rem; 
            margin-left: auto;
            margin-right: auto;
            max-width: 28rem;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); 
          }

          .brand-segment {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            padding: 0px 8px; 
            cursor: pointer;
            transition: all 300ms ease-in-out;
            border-radius: 9999px;
            color: #4b5563; 
            cursor: pointer;
          }

          .brand-segment:hover {
            background-color: #f3f4f6 !important;
          }

          .brand-segment.active {
            background-color: #fff !important;
            color: #1f2937; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          }

          .brand-logo {
            height: 40px;
            width: 40px; 
            object-fit: contain;
          }

          .brand-name {
            font-size: 0.75rem; 
            line-height: 1rem; 
            font-weight: 600; 
            color: #4b5563;
          }

          .brand-segment.active .brand-name {
            color: #1f2937; 
          }

          .content-area {
            padding: 2rem; 
          }

          .selected-text {
            color: #4b5563; 
            text-align: center;
            font-size: 1.125rem; 
            line-height: 1.75rem; 
          }

          .selected-brand-name {
            font-weight: 700; /* font-bold */
            color: #6d28d9; /* text-purple-700 */
          }

          .dynamic-content-box {
            margin-top: 1.5rem; /* mt-6 */
            padding: 1rem; /* p-4 */
            background-color: #f9fafb; /* bg-gray-50 */
            border-radius: 0.5rem; /* rounded-lg */
            color: #374151; /* text-gray-700 */
            font-size: 0.875rem; /* text-sm */
            line-height: 1.25rem; /* text-sm */
            font-style: italic;
          }

          /* Responsive adjustments for smaller screens if needed */
          @media (max-width: 640px) {
              .segmented-control-container {
                  max-width: 100%; /* Allows it to take full width on small screens */
                  padding: 0.15rem; /* Slightly less padding */
              }
              .brand-segment {
                  padding-left: 0.5rem;
                  padding-right: 0.5rem;
              }
              .brand-logo {
                  height: 1.8rem; /* Slightly smaller on mobile */
              }
          }
          `}
        </style>
        <div class="card-container">
          <h2 class="card-heading">Select Branding</h2>

          <div class="segmented-control-container">
            {this.brands.map((brand) => (
              <div
                key={brand.name}
                class={`brand-segment ${
                  this.selectedBrand === brand.name ? "active" : ""
                }`}
                onClick={() => this.updateBrand(brand.name)}
              >
                <img
                  src={brand.logoUrl}
                  alt={`${brand.name} Logo`}
                  class="brand-logo"
                  onError={(e: any) => {
                    e.target.src =
                      "https://placehold.co/80x40/cccccc/000000?text=Logo";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
