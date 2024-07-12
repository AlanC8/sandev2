import fs from "fs";
import path from "path";
import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

const getOutfit = async () => {
  const urls = [
    "https://qazaqrepublic.com/shop/bottom",
    "https://qazaqrepublic.com/shop/shirt",
    "https://qazaqrepublic.com/shop/t-shirts",
    "https://qazaqrepublic.com/shop/hoodies",
    "https://qazaqrepublic.com/shop/sweatshirts",
    "https://qazaqrepublic.com/shop/headwear",
    "https://qazaqrepublic.com/shop/bags",
    "https://qazaqrepublic.com/shop/accessories",
  ];

  const res = [
    "bottom",
    "shirt",
    "t-shirts",
    "hoodies",
    "sweatshirts",
    "headwear",
    "bags",
    "accessories",
  ];

  const directoryPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  for (let i = 0; i < res.length; i++) {
    axios.get(`https://qazaqrepublic.com/shop/` + res[i]).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const catalogItems: any = [];

      $(".catalog_item").each((index, element) => {
        const image =
          "https://qazaqrepublic.com" +
          $(element).find(".catalog_item__image img").attr("src");
        const name = $(element).find(".catalog_item__name").text().trim();
        const price = $(element).find(".catalog_item__price").text().trim();
        const label = $(element).find(".catalog_item__label").text().trim();

        catalogItems.push({ image, name, price, label });
      });

      fs.writeFileSync(
        path.join(directoryPath, `${res[i]}.json`),
        JSON.stringify(catalogItems, null, 2)
      );
    });
  }
};

const getBottom = async () => {
  const directoryPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
  await axios.get(`https://qazaqrepublic.com/shop/` + "bottom").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const catalogItems: any = [];

    $(".catalog_item").each((index, element) => {
      const image =
        "https://qazaqrepublic.com" +
        $(element).find(".catalog_item__image img").attr("src");
      const name = $(element).find(".catalog_item__name").text().trim();
      const price = $(element).find(".catalog_item__price").text().trim();
      const label = $(element).find(".catalog_item__label").text().trim();

      catalogItems.push({ image, name, price, label });
    });

    fs.writeFileSync(
      path.join(directoryPath, `bottom.json`),
      JSON.stringify(catalogItems, null, 2)
    );
  });
};

const getZaraDress = async () => {
  const baseUrl =
    "https://www.zara.com/kz/ru/category/2417457/products?ajax=true&page=";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "sec-ch-ua":
      '"Chromium";v="124", "YaBrowser";v="24.6", "Not-A.Brand";v="99", "Yowser";v="2.5"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    Referer:
      "https://www.zara.com/kz/ru/zhenshchiny-platya-l1066.html?v1=2417457",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };

  const totalPages = 10; // Number of pages to fetch

  try {
    const allProductsData: any[] = []; // Array to store all products from all pages

    for (let i = 1; i <= totalPages; i++) {
      const url = baseUrl + i;
      const response = await axios.get(url, { headers });

      if (
        response.data.productGroups &&
        Array.isArray(response.data.productGroups) &&
        response.data.productGroups.length > 0
      ) {
        // Iterate through each group of products
        response.data.productGroups.forEach((group) => {
          if (
            group.elements &&
            Array.isArray(group.elements) &&
            group.elements.length > 0
          ) {
            group.elements.forEach((element) => {
              // Ensure commercialComponents array exists and has at least one item
              if (
                element.commercialComponents &&
                Array.isArray(element.commercialComponents) &&
                element.commercialComponents.length > 0
              ) {
                const product: any = {
                  id: element.commercialComponents[0].id,
                  title: element.commercialComponents[0].name,
                  price: element.commercialComponents[0]?.price,
                  description: element.commercialComponents[0]?.description,
                  imageLink:
                    element.commercialComponents[0].detail?.colors[0]?.xmedia[0]
                      ?.url || "",
                  colors:
                    element.commercialComponents[0].detail?.colors[0]?.name ||
                    "",
                };
                allProductsData.push(product);
              }
            });
          }
        });
      } else {
        console.log(`No product data found on page ${i}.`);
      }
    }

    // Path and filename for saving the JSON file
    const filePath = "./zara_dresses.json";

    // Convert all products data to JSON string
    const jsonData = JSON.stringify(allProductsData, null, 2);

    // Write data to file
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(`Data successfully saved to ${filePath}`);
      }
    });
  } catch (error) {
    console.error("Error executing request or processing data:", error);
  }
};

const pinterestPins = async (tags) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      `https://ru.pinterest.com/search/pins/?q=${encodeURIComponent(tags)}`,
      {
        waitUntil: "networkidle2",
      }
    );

    const pins = await page.evaluate(() => {
      const pinElements = document.querySelectorAll('div[data-test-id="pin"]');
      const pins: any = [];
      pinElements.forEach((element) => {
        const title = element
          .querySelector("a[aria-label]")
          ?.getAttribute("aria-label");
        const link = element.querySelector("a[aria-label]");
        const image = element.querySelector("img")?.src;
        if (title && link && image) {
          pins.push({ title, link, image });
        }
      });
      return pins;
    });

    await browser.close();

    console.log(pins);
  } catch (error) {
    console.error("Error fetching Pinterest pins:", error);
  }
};

const parseImagesWildberries = async (url: string): Promise<string[]> => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2' });

    const images = await page.evaluate(() => {
      const imgElements = document.querySelectorAll('.custom-slider__item img');
      const imgUrls = Array.from(imgElements).map(img => img );
      return imgUrls;
    });

    return images;
  } catch (error) {
    console.error('Error fetching the webpage:', error);
    throw new Error('Failed to parse images from the webpage');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const kaspiParse = async (url: string): Promise<string[]> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.content(); // Get the HTML content
    await browser.close();

    const $ = cheerio.load(data);

    let images: string[] = [];
    $('ul.item__slider-controls a.item__slider-thumb img.item__slider-thumb-pic').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc) {
        images.push(imgSrc);
      }
    });

    return images;
  } catch (error) {
    console.error('Error parsing Kaspi page:', error);
    return [];
  }
}

export { getOutfit, getZaraDress, pinterestPins , getBottom, parseImagesWildberries, kaspiParse};
