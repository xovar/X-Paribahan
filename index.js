const seats = document.querySelectorAll(".seats");

let seatNumber = document.getElementById("seat-number");

const ticketInfo = document.getElementById("ticket-info");

const showSeats = document.getElementById("showSeats");

const totalPrice= document.getElementById("totalPrice");

const couponBtn = document.getElementById("couponBtn");

const couponInput = document.getElementById("couponInput");

const discounted = document.getElementById("discounted");

const grandTotal = document.getElementById("grandTotal");

let discountPrice = 0;

let count = 1;

let grandTotalSum = 0;

const arrTickets = [];

seats.forEach(seat => {
    seat.addEventListener("click", (e) => {
        if(count <= 4){
            const selectedSeat = e.target;
            arrTickets.push({name: `${e.target.innerText}`, class: 'Economoy', price: 550 });
            selectedSeat.classList.add("seat-selected");
            const avaiableSeats = parseInt(seatNumber.innerText) - 1;
            seatNumber.innerText = avaiableSeats;

            showSeats.innerText = parseInt(showSeats.innerText) + 1;

            ticketInfo.innerHTML = '';
            arrTickets.map(ticket => {
                const div = document.createElement('div');
                const nameH1 = document.createElement('h1');
                const classH1 = document.createElement('h1');
                const priceH1 = document.createElement('h1');
                div.classList.add("flex", "justify-between");
                nameH1.classList.add("font-inter", "text-base", "font-normal", "seat-color");
                classH1.classList.add("font-inter", "text-base", "font-normal", "seat-color");
                priceH1.classList.add("font-inter", "text-base", "font-normal", "seat-color");
                nameH1.innerText = `${ticket.name}`;
                classH1.innerText = `${ticket.class}`;
                priceH1.innerText = `${ticket.price}`;
                div.appendChild(nameH1);
                div.appendChild(classH1);
                div.appendChild(priceH1);
                ticketInfo.appendChild(div);
                totalPrice.innerHTML = 550 * arrTickets.length;
                grandTotal.innerHTML = 550 * arrTickets.length;
                grandTotalSum = 550 * arrTickets.length;
                if(arrTickets.length >= 4){
                    couponBtn.classList.remove("seat-unselected");
                    couponBtn.classList.add("text-white", "bg-color");
                }
            });
        }
        count++
    });
});

let couponUsed = false;
couponBtn.addEventListener("click", () => {
    if(couponInput.value == ''){
        alert("Please Input A Valid Coupon");
    }else if(arrTickets.length < 4){
        alert("The Coupon Is Only For 4 Seats")
    }else{
        const inputValue = couponInput.value;
        const couponCodes = ["NEW15","Couple20","new15","couple20","COUPLE20"];
        const findCoupon = couponCodes.filter(code => code.includes(inputValue));
        if(findCoupon.length == 1){
            if(!couponUsed){
                const h1Name = document.createElement("h1");
                const h1Prices = document.createElement("h1");
                h1Name.classList.add("font-inter", "text-base", "font-medium");
                h1Prices.classList.add("font-inter", "text-base", "font-medium");
                const price = arrTickets.length * 550;
                h1Name.innerText = "Discount";
                couponUsed = true;
                if(findCoupon[0] == 'NEW15' || findCoupon[0] == 'new15'){
                    discountPrice = price * 0.15;
                    h1Prices.innerText = "15%";
                    grandTotal.innerHTML = price - discountPrice;
                    discounted.appendChild(h1Name);
                    discounted.appendChild(h1Prices);
                    grandTotalSum = price - discountPrice;
                }else{
                    discountPrice = price * 0.20;
                    h1Prices.innerText = "20%";
                    grandTotal.innerHTML = price - discountPrice;
                    discounted.appendChild(h1Name);
                    discounted.appendChild(h1Prices);
                    grandTotalSum = price - discountPrice;
                }
            }else{
                alert("Can't Use Coupon More Than Once");
            }
            
        }else{
            alert("Not Found");
        }
    }
})

/* Info Section */

const submitBtn = document.getElementById("submitBtn");
const pName = document.getElementById("pName");
const pNumber = document.getElementById("pNumber");
const pEmail = document.getElementById("pEmail");

submitBtn.addEventListener("click", () => {
    if(!pName.value == "" && !pNumber.value == "" && !pEmail.value == ""){
        if(grandTotalSum > 0){
            window.location.href = "./success.html";
        }else{
            alert("Please Select Seat");
        }
    }else{
        alert("please insert valid info")
    }
})