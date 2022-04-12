/// <reference types="cypress" />;

describe("My first suite", () => {
  it("first test", () => {
    //for Cypress to check or test --we should do the visiting
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //Type locators--------------------------------
    //by tag name
    cy.get("input");
    //by ID
    cy.get("#inputEmail1");
    //by class name
    cy.get(".input-full-width");
    //by attr name
    cy.get("[placeholder]");

    //by attr name and value
    cy.get('[placeholder="Email"]');
    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and attr with value
    cy.get("input[placeholder]");
    //by 2 different attributes
    cy.get('[placeholder="Email"][placeholder="Email"]');

    //tag name attr with value, ID and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by cypress --creating own attr
    cy.get('[data-cy="imputEmail1"]');
  });
  //for running the cypress and tell them where to look
  it("Second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");

    // cy.get(".custom-checkbox").click()--won't work os we get there via parent and children path

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains("nb-card", "Using the Grid").find('[for="inputEmail1"]').should('contain', 'Email');
    // cy.contains("nb-card", "Using the Grid").find('[for="inputPassword2"]').should('contain', 'Password');
    // cy.contains("nb-card", "Basic form").find('[for="exampleInputEmail1"]').should('contain', 'Email');
    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    // getting rid of duplication
    cy.contains("nb-card", "Using the Grid").then((firstFrom) => {
      const emailLabelFirst = firstFrom.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstFrom
        .find('[for="inputPassword2"]')
        .text();
      //below is Chai assertion
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelFirst).to.equal(passwordLabelSecond);
        //above is Jquery method firstForm above is Jquery object --below is cypress method which is synchronics and it should be chained

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
    //2

    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });
    // 3 cypress invoke method example one
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    //for checkbox to see if it is checked
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .should("contain", "checked");
  });

  it("invoke command 4th-- assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("11").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Mar 30, 2022"); //this test might fail as date must be mocked normally
      });
  });
  it("Radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkbox", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
  });

  it("Lists and dropdown", () => {
    cy.visit("/");
    //1
    // cy.get('nav nb-select').click()
    // cy.get(".options-list").contains('Dark').click();
    //  cy.get("nav nb-select").should('contain', 'Dark')
    // cy.get("nb-layout-header nav ").should('have.css', 'background-color','rgb(34, 43, 69)')

    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
  it("table test", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    //1
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });
    //2
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("zaghart");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Hoodhoodi");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumn) => {
        cy.wrap(tableColumn).eq(2).should("contain", "zaghart");
        cy.wrap(tableColumn).eq(3).should("contain", "Hoodhoodi");
      });
    // //3
    // cy.get('thead [placeholder="Age"]').type('20')
    // cy.wait(500)
    // cy.get('tbody tr').each( tableRow =>{
    //   cy.wrap(tableRow).find('td').eq(6).should('contain' , 20)
    // })
    //4
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age === 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it.only("datepicker test-- assert property", () => {

    function selectDayFormCurrent(day) {

      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("default", { month: "short" });
      let dateAssert = futureMonth + " " + futureDay + ", " + date.getFullYear();

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFormCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
        return dateAssert
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
       let dateAssert = selectDayFormCurrent(3);

        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  });
});
