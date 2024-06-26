// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Add Task', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Add Task', async function() {
    await driver.get("http://localhost:5173/")
    await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.css("input")).click()
    await driver.findElement(By.css("input")).sendKeys("New Test 2")
    await driver.findElement(By.css("button")).click()
  })
})
