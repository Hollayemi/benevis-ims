export const storeCategories = (newCates) => [
    {
        name: "Aluminium Longspan",
        subcategories: ["0.45mm", "0.55mm", "0.70mm", "0.90mm"],
    },
    {
        name: "Aluminium Step Tile",
        subcategories: ["0.45mm", "0.55mm", "0.70mm"],
    },
    {
        name: "Aluminium Metcoppo",
        subcategories: ["0.45mm", "0.55mm", "0.70mm"],
    },
    {
        name: "Stone Coated Roofing",
        subcategories: [
            "Roman",
            "Shingle",
            "Bond",
            "Milano",
            "Shaka",
            "Classic",
        ],
    },
    {
        name: "Accessories",
        subcategories: ["Ridge Cap", "Valley Gutter", "Side Cap", "Screws"],
    },
    ...newCates?.data?.map((e) => ({ name: e.name })) || []
];
