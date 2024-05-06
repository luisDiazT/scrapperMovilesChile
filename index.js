import { chromium } from 'playwright';
class PlanesWom {
  constructor (planText) {
    const [plan, precio] = planText.split('$')
    this.Plan = plan
    this.Precio = parseInt(precio.replace('.', ''))
  }
}
(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://store.wom.cl/planes/')
  const planItems = await page.$$('.PlanItem-module--PlanNameAndPriceContainer--2S0Tv')
  const planTexts = await Promise.all(planItems.map(item => item.textContent()))
  const planesWom = planTexts.map(planText => new PlanesWom(planText));
  console.log(planesWom)
  await browser.close()
})()
