from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Landing Page
        page.goto("http://localhost:3000")
        page.screenshot(path="verification/landing_page.png")
        print("Captured Landing Page")

        # 2. Dashboard (Empty State)
        page.goto("http://localhost:3000/dashboard")
        page.screenshot(path="verification/dashboard_empty.png")
        print("Captured Dashboard Empty State")

        # 3. Create Raffle Page
        page.goto("http://localhost:3000/create")

        # Fill Form
        page.fill("input[name='title']", "Rifa Solidária")
        page.fill("textarea[name='description']", "Rifa para ajudar na construção do parquinho.")
        page.fill("input[name='ticketPrice']", "5.00")
        page.fill("input[name='totalTickets']", "50")

        # Select Theme (Money)
        # Assuming theme selection is clickable div/radio. Based on code:
        # onClick={() => handleThemeChange(theme.value)}
        # We need to find the element that represents the 'money' theme.
        # It has text "Dinheiro".
        page.click("text=Dinheiro")

        page.screenshot(path="verification/create_raffle_filled.png")
        print("Captured Create Raffle Form Filled")

        # Submit
        page.click("text=Confirmar e Criar")

        # Should redirect to Dashboard
        page.wait_for_url("http://localhost:3000/dashboard")
        page.wait_for_selector("text=Rifa Solidária") # Wait for the new raffle to appear
        page.screenshot(path="verification/dashboard_with_raffle.png")
        print("Captured Dashboard with Raffle")

        # 4. Raffle Details Page
        # Click on "Ver Rifa" button.
        page.click("text=Ver Rifa")

        # Wait for details page
        page.wait_for_selector("text=Rifa Solidária")
        page.screenshot(path="verification/raffle_details.png")
        print("Captured Raffle Details")

        # Buy Ticket
        # Click on ticket #1
        page.click("button:has-text('1')")

        # Wait for Modal
        page.wait_for_selector("text=Confirmar Compra")
        page.screenshot(path="verification/purchase_modal.png")
        print("Captured Purchase Modal")

        # Confirm
        page.click("text=Confirmar Pagamento")

        # Wait for success
        page.wait_for_selector("text=Compra Confirmada!")
        page.screenshot(path="verification/purchase_success.png")
        print("Captured Purchase Success")

        # Close modal
        page.click("text=Fechar")

        # Verify ticket is sold (should be disabled/different style)
        # In code: disabled={isSold} and opacity-50
        # We can check if it is disabled
        is_disabled = page.is_disabled("button:has-text('1')")
        print(f"Ticket 1 is disabled: {is_disabled}")
        page.screenshot(path="verification/raffle_details_sold.png")

        browser.close()

if __name__ == "__main__":
    verify_app()
