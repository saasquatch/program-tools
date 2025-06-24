import { Component, State, h, Host } from "@stencil/core";

@Component({
  tag: "sqm-brand-selector",
  shadow: true, // Encapsulate styles within the component
})
export class SqmBrandSelector {
  // State to keep track of the currently selected brand
  @State() selectedBrand: string = "Netflix"; // Default selected brand

  // Array of brand objects, each containing a name and an image URL.
  // Using placeholder images for now. In a real application, you would
  // replace these with actual logo URLs or local assets.
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

  // Handler function for when a brand logo is clicked
  private handleBrandClick = (brandName: string) => {
    this.selectedBrand = brandName; // Update the selected brand in the state
  };

  render() {
    return (
      <Host>
        {/* Vanilla CSS styles encapsulated within the shadow DOM */}
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          :host {
            display: block; /* Ensure the custom element itself is a block-level element */
            font-family: 'Inter', sans-serif;
          }

          .card-container {
            background-color: #fff; 
            border-radius: 18px; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); 
            width: 100%;
            max-width: 500px;
            overflow: hidden;
            padding: 20px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 999999;
          }

          .card-heading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            color: black;
            margin: 0;
          }

          .segmented-control-container {
            display: flex;
            background-color: #e5e7eb; /* gray-200 */
            border-radius: 9999px; /* rounded-full */
            padding: 0.25rem; /* p-1 */
            margin-left: auto;
            margin-right: auto;
            max-width: 28rem; /* max-w-sm */
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); /* shadow-inner */
          }

          .brand-segment {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            padding-top: 0.5rem; /* py-2 */
            padding-bottom: 0.5rem; /* py-2 */
            padding-left: 0.75rem; /* px-3 */
            padding-right: 0.75rem; /* px-3 */
            cursor: pointer;
            transition: all 300ms ease-in-out;
            border-radius: 9999px; /* rounded-full */
            color: #4b5563; /* text-gray-600 */
          }

          .brand-segment:hover {
            background-color: #f3f4f6; /* hover:bg-gray-100 */
          }

          .brand-segment.active {
            background-color: #fff; /* bg-white */
            color: #1f2937; /* text-gray-800 */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-md */
          }

          .brand-logo {
            height: 50px; /* h-8 */
            width: 50px; /* w-auto */
            object-fit: contain;
          }

          .brand-name {
            font-size: 0.75rem; /* text-xs */
            line-height: 1rem; /* text-xs */
            font-weight: 600; /* font-semibold */
            color: #4b5563; /* text-gray-600 */
          }

          .brand-segment.active .brand-name {
            color: #1f2937; /* text-gray-800 */
          }

          .content-area {
            padding: 2rem; /* p-8 */
          }

          .selected-text {
            color: #4b5563; /* text-gray-600 */
            text-align: center;
            font-size: 1.125rem; /* text-lg */
            line-height: 1.75rem; /* text-lg */
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

          {/* Segmented Control Container */}
          <div class="segmented-control-container">
            {this.brands.map((brand) => (
              // Individual brand segment/pill
              <div
                key={brand.name}
                class={`brand-segment ${
                  this.selectedBrand === brand.name ? "active" : ""
                }`}
                onClick={() => this.handleBrandClick(brand.name)}
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
                {/* <span class="brand-name">{brand.name}</span> */}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
