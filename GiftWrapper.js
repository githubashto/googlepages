function GiftWrapper(giftDiv)
		{
			this.giftDiv = document.getElementById(giftDiv);
			this.giftDiv.padding = 0;
			// change these elements if you have better gift wrap animation
			// however, you will also have to change the dimensions and positioning of the gift Item below
			
			this.wrapperImage = 
			{
				closedImage : "Wraped_start.gif",
				openImage 	: "Wraped_Withoutbook.gif",
				top : -90,
				left : 325,
				width : 160
				
			}
			
			// putting the gift inside the wrapper
			var giftItemDiv = document.createElement("img");
			giftItemDiv.id = this.giftDiv + "_giftItem";
			giftItemDiv.style.position = "relative";
			giftItemDiv.style.top =  this.wrapperImage.top;
			giftItemDiv.style.left = this.wrapperImage.left;
			//giftItemDiv.style.height = this.wrapperImage.height; 
			giftItemDiv.style.width = this.wrapperImage.width;
			
			this.giftDiv.appendChild(giftItemDiv);
			this.giftItemDiv = giftItemDiv;

			// creating the gift wrap
			var wrapperDiv = document.createElement("img");
			wrapperDiv.id = this.giftDiv.id + "_wrapper"; 
			wrapperDiv.src = this.wrapperImage.closedImage;
			wrapperDiv.style.position = "relative";
			wrapperDiv.style.top =  "0px";
			wrapperDiv.style.left = "0px";
			this.giftDiv.appendChild(wrapperDiv);
			this.wrapperDiv = wrapperDiv;
		}
		
		/**
		 * Responsible for opening the gift wrapper
		 */
		GiftWrapper.prototype.openGift = function()
		{
			this.wrapperDiv.src = this.wrapperImage.closedImage;
			this.wrapperDiv.src = this.wrapperImage.openImage;
		}
		
		/**
		 * Responsible for opening the gift wrapper
		 */
		GiftWrapper.prototype.wrapGift = function()
		{
			this.wrapperDiv.src = this.wrapperImage.closedImage;
		}
		
		/**
		 * Sets the gift Item
		 */
		GiftWrapper.prototype.setGift = function(giftUrl)
		{
			this.giftItemDiv.src = giftUrl;
		}
