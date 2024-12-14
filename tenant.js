// Base API URL
const API_BASE_URL = "http://localhost:3000/api"; // Replace with your backend URL

// Fetch and render listings (Tenant Page)
async function fetchAndRenderListings(filter = {}) {
  const listingsContainer = document.getElementById("listings");
  listingsContainer.innerHTML = "<p>Loading...</p>";

  // Build query params for filtering
  const params = new URLSearchParams();
  if (filter.price) params.append("priceRange", filter.price.join("-"));
  if (filter.type) params.append("type", filter.type);

  try {
    const response = await fetch(`${API_BASE_URL}/listings?${params.toString()}`);
    const listings = await response.json();
    listingsContainer.innerHTML = "";

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings found.</p>";
      return;
    }

    listings.forEach((listing) => {
      const card = document.createElement("div");
      card.className = "listing-card";
      card.innerHTML = `
        <h3>${listing.title}</h3>
        <p>Price: $${listing.price}</p>
        <p>Type: ${listing.type}</p>
        <p>Location: ${listing.location}</p>
        <button onclick="addToFavorites(${listing.id})">Add to Favorites</button>
      `;
      listingsContainer.appendChild(card);
    });
  } catch (error) {
    listingsContainer.innerHTML = "<p>Error loading listings.</p>";
    console.error(error);
  }
}

// Add new listing (Landlord Page)
async function addListing(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const price = parseInt(document.getElementById("price").value);
  const type = document.getElementById("type").value;
  const location = document.getElementById("location").value;

  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, type, location }),
    });

    if (response.ok) {
      alert("Listing added!");
      document.getElementById("listingForm").reset();
      fetchAndRenderListings(); // Refresh listings for landlords
    } else {
      alert("Failed to add listing.");
    }
  } catch (error) {
    console.error("Error adding listing:", error);
  }
}

// Delete a listing (Landlord Page)
async function deleteListing(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Listing deleted!");
      fetchAndRenderListings(); // Refresh listings for landlords
    } else {
      alert("Failed to delete listing.");
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
  }
}

// Add to favorites (Tenant Page)
async function addToFavorites(listingId) {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId }),
    });

    if (response.ok) {
      alert("Added to favorites!");
    } else {
      alert("Failed to add to favorites.");
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}

// Filter listings (Tenant Page)
function filterListings() {
  const priceRange = document.getElementById("priceRange").value.split("-");
  const houseType = document.getElementById("houseType").value;

  const filter = {
    price: priceRange.length === 2 ? [parseInt(priceRange[0]), parseInt(priceRange[1])] : null,
    type: houseType || null,
  };

  fetchAndRenderListings(filter);
}

// Attach event listeners
if (document.getElementById("listingForm")) {
  document.getElementById("listingForm").addEventListener("submit", addListing);
}

if (document.getElementById("filterBtn")) {
  document.getElementById("filterBtn").addEventListener("click", filterListings);
}

// Initial render
if (document.getElementById("listings")) {
  fetchAndRenderListings();
}