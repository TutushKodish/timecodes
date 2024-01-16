	const container = document.getElementById("fields");
	const addRowButton = document.getElementById("addRow");
	const textarea = document.getElementById("text0");
	let rowNum = 1; // номер первой новой строки
	var player = null;
	var playerElement = document.querySelector('#player');
	var wrapper = document.querySelector('#wrapper');
	playerElement.style.display = "none";
	resize.style.display = "none";
	resizeHeight.style.display = "none";
	move.style.display = "none";
	changeLink.style.display = "none";

	document.querySelector("#video").addEventListener("click", e => {
	    if (document.querySelector('#player').style.display === "none") {
	        // Load the YouTube IFrame API script if it hasn't been loaded already
	        if (!window.YT) {
	            var tag = document.createElement('script');
	            tag.src = "https://www.youtube.com/iframe_api";
	            var firstScriptTag = document.getElementsByTagName('script')[0];
	            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	        } else {
	            // If the API script is already loaded, create the player immediately
	            onYouTubeIframeAPIReady();
	        }
	        // Show the player
	        
	        document.querySelector('#player').style.display = "flex";
	        wrapper.style.display = "flex";
	        changeLink.style.display = "block";	   
	        resize.style.display = "none";
	        resizeHeight.style.display = "none";
	        move.style.display = "none";     
	    } else {
        player.stopVideo();
    		document.querySelector('#player').style.display = "none"; 
    		wrapper.style.display = "none";
    		changeLink.style.display = "none";  
    		resize.style.display = "none";
    		resizeHeight.style.display = "none";
        move.style.display = "none";		
    	} 
	});

	document.querySelector("#changeLink").addEventListener("click", e => {
		  const videoInput = document.querySelector("#videoInput");
		  const updateButton = document.querySelector("#updateButton");

		  if (videoInput.style.display === "none") {
		  	inputFieldContainer.style.display = "flex";
		    videoInput.style.display = "initial";
		    updateButton.style.display = "initial";
		  } else {
		    videoInput.style.display = "none";
		    updateButton.style.display = "none";
		  }
	}); 

	document.addEventListener("DOMContentLoaded", function() {
	  interact('#wrapper')
	    .draggable({
	      inertia: true,
	      modifiers: [
	        interact.modifiers.restrictRect({
	          restriction: 'window',
	          endOnly: true
	        })
	      ],
	      listeners: {
	        start(event) {
	          $('.frameOverlay').show();
	          disableScroll(); // Disable page scrolling
	        },
	        move(event) {
	          const target = event.target;
			  const rect = target.getBoundingClientRect();
			  const targetWidth = rect.width;
			  const targetHeight = rect.height;
			  const minX = 0;
			  const maxX = window.innerWidth - targetWidth;
			  const maxY = window.innerHeight - targetHeight;

			  const x = parseFloat(target.getAttribute('data-x')) || 0; // Use current x position
			  const y = Math.max(Math.min(maxY, (parseFloat(target.getAttribute('data-y')) || 0) + event.dy));

			  target.style.transform = `translate(${x}px, ${y}px)`;
			  target.setAttribute('data-x', x);
			  target.setAttribute('data-y', y);
	        },
	        end(event) {
	          $('.frameOverlay').hide();
	          enableScroll(); // Enable page scrolling
	        }
	      }
	    })
	    // .resizable({
	    //   edges: { left: true, right: true, bottom: true, top: true },
	    //   listeners: {
	    //     start(event) {
	    //       $('.frameOverlay').show();
	    //       disableScroll(); // Disable page scrolling
	    //     },
	    //     move(event) {
	    //       const target = event.target;
	    //       const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
	    //       const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;

	    //       target.style.width = event.rect.width + 'px';
	    //       target.style.height = event.rect.height + 'px';
	    //       target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

	    //       target.setAttribute('data-x', x);
	    //       target.setAttribute('data-y', y);
	    //     },
	    //     end(event) {
	    //       $('.frameOverlay').hide();
	    //       enableScroll(); // Enable page scrolling
	    //     }
	    //   }
	    // })
	    // .styleCursor({
	    //   left: 'w-resize',
	    //   right: 'e-resize',
	    //   top: 'n-resize',
	    //   bottom: 's-resize',
	    //   topLeft: 'nw-resize',
	    //   topRight: 'ne-resize',
	    //   bottomLeft: 'sw-resize',
	    //   bottomRight: 'se-resize'
	    // });

	  function disableScroll() {
	    document.addEventListener('touchmove', preventScroll, { passive: false });
	  }

	  function enableScroll() {
	    document.removeEventListener('touchmove', preventScroll);
	  }

	  function preventScroll(event) {
	    event.preventDefault();
	  }
	});

	document.querySelectorAll("#pauseButton").forEach(button => {
    button.addEventListener("click", e => {
      var tr = e.currentTarget.parentElement.parentElement;
      var input = tr.querySelector("input");
      if (input && input.value.trim().length == 0) {
        input.value = formatTime(onYouTubeIframeAPIReady().getCurrentTime());
      }
      saveForm(new Event("click"));
    });
  });

	document.addEventListener('DOMContentLoaded', function() {
	  var wrapperElement = document.querySelector('#wrapper');

	  stickybits(wrapperElement, {
	    stickyBitStickyOffset: 0, // Set the offset to 0
	    verticalPosition: 'bottom', // Stick element to the bottom
	    useGetBoundingClientRect: true,
	  });
	});
	document.querySelectorAll(".tc").forEach(i => {
				  	if (i.value.split(":")[0] == "00" && i.value.split(":").length == 3) {
					  	i.value = i.value.slice(3);
					  }
				  });
	addRowButton.addEventListener("click", function() {
	    	addNewRow();
	  });
	document.querySelector('#changeTime').addEventListener("click", e => {
		document.querySelector("#timeForm").classList.toggle("hidden");
		if (!document.querySelector("#timeForm").classList.contains("hidden"))
		{
			document.querySelector("#timeForm").style.display = "flex";
		}
		else {
			document.querySelector("#timeForm").style.display = "none";
		}
	});

	document.querySelector("#save").addEventListener("click", e => {
	  		document.querySelector(".pics").classList.toggle("hidden");
	  		saveForm(e);
	  });
  document.querySelector("#lesina").addEventListener("click", e => {
			document.querySelector(".pic").classList.toggle("hidden");
	  });
	document.querySelectorAll("input")[document.querySelectorAll("textarea").length-1].focus();
	document.querySelectorAll("textarea").forEach(i => {
	  		i.style.height = "5px";
	    	i.style.height = (i.scrollHeight) + "px";
	  });
	document.querySelectorAll(".delete").forEach(i => {
	  		i.addEventListener("click", deleteRow)
	  		i.addEventListener("click", saveForm)
	  });
	for (var i = 1; i < document.querySelectorAll("textarea").length; i++) {
	  		addSuggestions(document.querySelectorAll("textarea")[i]);
	  		autoGrowTextarea(document.querySelectorAll("textarea")[i]);
	  }
	document.querySelectorAll("input").forEach(i => {
	    	//i.addEventListener("change", saveForm);
	    	i.addEventListener("keydown", e => {
	    		if(e.currentTarget.value.length == 8 || e.key === "Enter" || e.key === "Tab") {
			  		e.currentTarget.value += "";
			    	// setTimeout(() => {
				  	// 	i.parentElement.parentElement.querySelector("textarea").focus();
					// }, 0);
					return true;
		    	}
		  		if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode === 8)){
			    	e.preventDefault();
			    }
		    	const regex = /^[0-9:]+$/; // регулярное выражение
		  		if(!regex.test(e.currentTarget.value)){ // если символы не являются цифрами или двоеточем
				    e.currentTarget.value = e.currentTarget.value.slice(0, -1); // удаляем последний символ из значения input
				    return false; // выходим из функции, чтобы введенный символ не отображался на экране
		  		}
				// добавляем двоеточие и ограничиваем количество цифр
				if ((e.currentTarget.value.length === 2 || e.currentTarget.value.length === 5) && e.keyCode !== 8) {
				    e.currentTarget.value += ":";
		  		} else if (e.currentTarget.value.length > 8) {
		    		e.currentTarget.value = e.currentTarget.value.slice(0, 8);
		  		} else if ((e.currentTarget.value.length === 3 || e.currentTarget.value.length === 6) && e.keyCode === 8){
		    		const inputValueArray = e.currentTarget.value.split('');
		    		inputValueArray.splice(-1, 1);
		    		e.currentTarget.value = inputValueArray.join('');
		  		}
		  		return true; // возвращаем true, чтобы введенный символ отобразился на экране
			});
    });
	document.querySelector("#copy").addEventListener("click", e => {
		    let text = "";
		    document.querySelectorAll("tr").forEach(tr => {
		        text += tr.querySelector("input").value + " " + tr.querySelector("textarea").value + "\n";
		    });

	        // Use Clipboard API if available
	        navigator.clipboard.writeText(text)
	            .then(() => {
	                alert("Скопировано!");
	            })
	            .catch((error) => {
	                // Fallback for unsupported browsers (e.g., mobile browsers)
			        const input = document.createElement("textarea");
			        input.value = text;
			        document.body.appendChild(input);
			        input.select();

			        try {
			            // Execute copy command
			            document.execCommand("copy");
			            alert("Скопировано!");
			        } catch (err) {
			            alert("НЕ СКОПИРОВАНО!" + " " + "err");
			        }

	        document.body.removeChild(input);
	            });
		});

	document.querySelectorAll("tr").forEach(i => {
	  			i.addEventListener("change", saveForm);
	  			});
	document.querySelectorAll("tr")[0].querySelector(".delete").style.display = "none";
	document.querySelectorAll("tr")[0].querySelector(".drag").style.display = "none";
	document.querySelectorAll("tr")[0].querySelector("#pauseButton").style.display = "none";

	document.addEventListener("DOMContentLoaded", qwerty);
	//qwerty();

	addFirstSuggestions(textarea);
	
	function addFirstSuggestions(textarea) {
	  	const suggestions = ['Заставка', 'Музыка', 'Заставка, музыка', 'Музыка, заставка', "Заставка и музыка", "Музыка и заставка", "Заставка с музыкой", "Музыка с заставкой"];
	    suggestions.sort();
	    const suggestionsList = document.createElement('ul');
	    suggestionsList.id = "popups";
	    suggestionsList.style.display = 'none';
	    container.appendChild(suggestionsList);

	    textarea.addEventListener('input', function() {
	      const inputText = this.value.toLowerCase();
	      suggestionsList.innerHTML = '';
	      if (!suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(inputText)).length) {
				suggestionsList.style.display = 'none';
			}
		    else {
		    	suggestionsList.style.display = 'block';
		    	var rect = textarea.getBoundingClientRect();
		    	//console.log(rect.top + document.body.scrollTop);
		    	suggestionsList.style.top = rect.top + document.body.scrollTop + "px";
		    	suggestionsList.style.left = rect.left + document.body.scrollLeft + "px";
		    }
	      suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(inputText)).forEach(suggestion => {
	        const li = document.createElement('li');
	        li.innerText = suggestion;

	        li.addEventListener('click', function() {
	          textarea.value = this.innerText;
	          suggestionsList.style.display = 'none';
	          textarea.focus();
	          autoGrowTextarea(textarea);
	   		  saveForm(new Event("click"));
	        });
	        suggestionsList.appendChild(li);
	        document.addEventListener('click', (e) => {
				if (!textarea.contains(e.target)) {
				    suggestionsList.style.display = 'none';
				  	}
				});
	        if (!suggestion.toLowerCase().startsWith(inputText)) suggestionsList.style.display = 'none';
		    else {
		    	suggestionsList.style.display = 'block';
		    	var rect = textarea.getBoundingClientRect();
		    	console.log(rect.top + document.body.scrollTop);
		    	suggestionsList.style.top = rect.top + document.body.scrollTop + "px";
		    	suggestionsList.style.left = rect.left + document.body.scrollLeft + "px";
		    }
	      });
	    });
	    container.appendChild(suggestionsList);
	    //autoGrowTextarea(textarea);
	  };
	function addSuggestions(newTextarea) {
	    const suggestions = ['Итоги опроса про ', 'Итоги опроса о', 'Голосование за новый фильм', 'Голосование за кринж', 'Победитель', 'Хинштейн vs. Ефанов:', 'Хинштейн против Ефанова:', '«Что купить в Самаре?»: ', 'Что купить в Самаре?: ', 'Исторический РЗВРТ: ', 'Новости России ', 'Новости Самары ', "Новости Украины ", "Новости мира ", "Новость Омска", "Новость из Омска", "Одна новость из Омска", 'Начало', "Прощание и ", "Прощание и песня", "Песня", "Прощание", "Чат: ", "Донаты", "Поддержка канала", "Поддержка канала, донаты", "Уголок пропагандиста: ", "Исторический РЗВРТ: Игорь Сажин о", "Чат: про ", "Еще про ", "Ещё про", "Подводка к разговору с ", "Разговор с", "Новости, которые мы заслужили", "План эфира", "Начало, план эфира", "Начало, план эфира, геоперекличка", "Геоперекличка", "Урок географии", "География слушателей", "География РЗВРТ", 'Новости России: ', 'Новости Самары: ', "Новости Украины: ", "Новости мира: ", "Прощание и Червона калина", "Прощание и «Червона калина»"];
	    suggestions.sort();
	    const suggestionsList = document.createElement('ul');
	    suggestionsList.id = "popups";
	    suggestionsList.style.display = 'none';
	    container.appendChild(suggestionsList);

	    newTextarea.addEventListener('input', function(e) {
		    const inputText = this.value.toLowerCase();
		    suggestionsList.innerHTML = '';
		    if (!suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(inputText)).length) {
				suggestionsList.style.display = 'none';
			}
		    else {
		    	suggestionsList.style.display = 'block';
		    	var rect = e.currentTarget.getBoundingClientRect();
		    	//console.log(rect.top + document.body.scrollTop);
		    	suggestionsList.style.top = rect.top + window.scrollY + 15 + "px";
		    	suggestionsList.style.left = rect.left + window.scrollX + "px";
		    }
		    suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(inputText)).forEach(suggestion => {
		        const li = document.createElement('li');
		        li.innerText = suggestion + " ";

		        li.addEventListener('click', function() {
		          	newTextarea.value = this.innerText + " ";
		          	newTextarea.focus();
		          	suggestionsList.style.display = 'none';
		          	autoGrowTextarea(newTextarea);
	    			saveForm(new Event("click"));
		        });
		        suggestionsList.appendChild(li);
				document.addEventListener('click', (e) => {
				  if (!newTextarea.contains(e.target)) {
				    suggestionsList.style.display = 'none';
				  }
				});
		    });
	    });
	    container.appendChild(suggestionsList);
	  };
	function autoGrowTextarea(textarea) {
	    textarea.style.height = "5px";
	    textarea.style.height = (textarea.scrollHeight) + "px";
	  }
	function deleteRow(e){
		var confirmation = confirm("Точно удалить, да? 🤔");
    	if (confirmation) {
        e.currentTarget.parentElement.parentElement.remove();
	  }
	};
	function addNewRow() {
	    const row = document.createElement("tr");
	    row.innerHTML = `
	      <td>
	        <input type="tel" id="timecode${rowNum}" name="timecode${rowNum}" maxlength="8" class="tc">
	      </td>
	      <td>
	        <textarea id="text${rowNum}" name="text${rowNum}" rows="1" oninput="autoGrowTextarea(this)" maxlength="100"></textarea>
	      </td>
	      <td><button class = "delete"><img src="{% static 'delete.png' %}" width="50px" height="50px"></button>
	      	  <button id="pauseButton"><img src="{% static 'addcode.png' %}" width="50px" height="50px"></button>
	          <button class="drag"><img src="{% static 'drag.png' %}" width="30px" height="30px"></button>
	      </td>
	    `;
	    //setupDragEvents(row);
	    const newRowInput = row.querySelector("input");
	    const newTextarea = row.querySelector("textarea");
	    setTimeout(() => {
		  newTextarea.focus();
		}, 0);
	    row.querySelector(".delete").addEventListener("click", deleteRow);
	    row.querySelector(".delete").addEventListener("click", saveForm);
	    row.querySelectorAll("#pauseButton").forEach(button => {
		    button.addEventListener("click", e => {
		      var tr = e.currentTarget.parentElement.parentElement;
		      var input = tr.querySelector("input");
		      if (input && input.value.trim().length == 0) {
		        input.value = formatTime(onYouTubeIframeAPIReady().getCurrentTime());
		      }
		      saveForm(new Event("click"));
		    });
		  });
	    newRowInput.addEventListener("keydown", e => {
	    	if(e.currentTarget.value.length == 8 || e.key === "Enter" || e.key === "Tab") {
		  		e.currentTarget.value += "";
		    	// setTimeout(() => {
			  	// 	newTextarea.focus();
				// }, 0);
				return true;
	    	}
		    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode === 8)){
		    	e.preventDefault();
		    }
	    	const regex = /^[0-9:]+$/; // регулярное выражение
	  		if(!regex.test(e.currentTarget.value)){ // если символы не являются цифрами или двоеточем
			    e.currentTarget.value = e.currentTarget.value.slice(0, -1); // удаляем последний символ из значения input
			    return false; // выходим из функции, чтобы введенный символ не отображался на экране
	  		}
			// добавляем двоеточие и ограничиваем количество цифр
			if ((e.currentTarget.value.length === 2 || e.currentTarget.value.length === 5) && e.keyCode !== 8) {
			    e.currentTarget.value += ":";
	  		} else if (e.currentTarget.value.length > 8) {
	    		e.currentTarget.value = e.currentTarget.value.slice(0, 8);
	  		} else if ((e.currentTarget.value.length === 3 || e.currentTarget.value.length === 6) && e.keyCode === 8){
	    		const inputValueArray = e.currentTarget.value.split('');
	    		inputValueArray.splice(-1, 1);
	    		e.currentTarget.value = inputValueArray.join('');
	  		}
	  		return true; // возвращаем true, чтобы введенный символ отобразился на экране
		}); 
	    addSuggestions(newTextarea);
	    container.appendChild(row);

	    newTextarea.addEventListener("input", function() {
	      let value = this.value;
	      if (value.length > 0) {
	        this.value = value.charAt(0).toUpperCase() + value.slice(1);
	      }
	    });
	    row.addEventListener("change", saveForm);
	    //row.addEventListener("DOMContentLoaded", qwerty);
	    qwerty();
	    //newRowInput.addEventListener("change", saveForm);
	    //newTextarea.addEventListener("change", saveForm);
	    }
	rowNum++;  	
	// function saveForm(event) {
	// 		  event.preventDefault(); // Prevent page reload
			  
	// 		  let form = document.querySelector('form');
			  
	// 		  let timestamps = [];
	// 	 	  let texts = [];

	// 	 	  document.querySelectorAll("tr").forEach(tr => {
	// 		        let timestampInput = tr.querySelector("input");
	// 		        let textAreaInput = tr.querySelector("textarea");
			        
	// 		        let timestamp = timestampInput.value;
	// 		        let text = textAreaInput.value;
			        
	// 		        timestamps.push(timestamp);
	// 		        texts.push(text);
	// 		    });
	// 		    document.querySelector("#timestamps-field").value = timestamps.join("\n");
	// 		    document.querySelector("#texts-field").value = texts.join("\n");

	// 		    let formData = new FormData(form);
	// 			  formData.set('timestamps_field', timestamps.join("\n"));
	// 			  formData.set('texts_field', texts.join("\n"));

	// 		  fetch(form.action, {
	// 		    method: form.method,
	// 		    body: formData
	// 		  })
	// 		  .then(response => {
	// 		    if (response.ok) {
	// 		      // Handle successful response
	// 		      console.log("Form submitted successfully!");
	// 		      // You can perform any additional actions here, such as updating the UI or displaying a success message
	// 		    } else {
	// 		      // Handle error response
	// 		      console.error("Form submission failed!");
	// 		    }
	// 		  })
	// 		  .catch(error => {
	// 		    // Handle network or other errors
	// 		    console.error("An error occurred while submitting the form:", error);
	// 		  });

	// 		  document.querySelectorAll(".tc").forEach(i => {
	// 		  	if (i.value.split(":")[0] == "00" && i.value.split(":").length == 3) {
	// 			  	i.value = i.value.slice(3);
	// 			  }
	// 		  });
	// 		}
	function incrementTime(isAddition = true) {
		  console.log("rabotaet");
		  // Get the increment value entered by the user
		  const incrementValue = document.getElementById("timeInput").value;

		  // Get all the input elements containing time values
		  var timeInputs = [...document.querySelectorAll(".tc")].slice(1);
		  var iVal = incrementValue.split(":");

		  // Iterate over each input element and increment the time value
		  for (var i = 0; i < timeInputs.length; i++) {
		  	  var tInputs = timeInputs[i].value.split(":");
		  	  
			  var seconds = "";
			  var minutes = "";
			  var hours = "";
			  var result = "";
			  var resNum = 0;
			  if (tInputs.length === 3) {
			  	result = "";
			  	seconds = tInputs[2];
			  	minutes = tInputs[1];
			  	hours = tInputs[0];
			  	if(isAddition)
				  	resNum = (parseInt(seconds) + parseInt(minutes)*60 + parseInt(hours)*3600)+(parseInt(iVal[2]) + parseInt(iVal[1])*60 + parseInt(iVal[0])*3600);
				else resNum = (parseInt(seconds) + parseInt(minutes)*60 + parseInt(hours)*3600)-(parseInt(iVal[2]) + parseInt(iVal[1])*60 + parseInt(iVal[0])*3600);
			  	result += "" + (Math.floor(resNum / 3600) > 9 ? Math.floor(resNum / 3600) : ("0"+Math.floor(resNum / 3600))) + ":" + 
			  				   (Math.floor((resNum % 3600) / 60) > 9 ? Math.floor((resNum % 3600) / 60) : ("0"+Math.floor((resNum % 3600) / 60))) + ":" + 
			  				   (((resNum % 3600) % 60) > 9 ? ((resNum % 3600) % 60) : ("0"+((resNum % 3600) % 60)));
			  	console.log(result);
			  }
			  if (tInputs.length === 2) {
			  	result = "";
			  	seconds = tInputs[1];
			  	minutes = tInputs[0];
			  	if(isAddition) resNum = (parseInt(seconds) + parseInt(minutes)*60) +(parseInt(iVal[2]) + parseInt(iVal[1])*60);
			  	else resNum = (parseInt(seconds) + parseInt(minutes)*60)-(parseInt(iVal[2]) + parseInt(iVal[1])*60);
			  	if (resNum < 0) {
			  		result = "00:00";
			  	}
			  	else{
			  		result += "" + (Math.floor(resNum / 3600) > 9 ? Math.floor(resNum / 3600) : ("0"+Math.floor(resNum / 3600))) + ":" + 
			  				   (Math.floor((resNum % 3600) / 60) > 9 ? Math.floor((resNum % 3600) / 60) : ("0"+Math.floor((resNum % 3600) / 60))) + ":" + 
			  				   (((resNum % 3600) % 60) > 9 ? ((resNum % 3600) % 60) : ("0"+((resNum % 3600) % 60)));
			  	}
			  	
			  	console.log(result);
			  }
			  timeInputs[i].value = result;
		  }
		  saveForm(new Event("click"));
	}
	function formatTime(totalSeconds) {
	  const hours = Math.floor(totalSeconds / 3600);
	  const minutes = Math.floor((totalSeconds % 3600) / 60);
	  const seconds = Math.floor(totalSeconds % 60);

	  let formattedTime = "";
	  if (hours > 0) {
	    formattedTime += padZero(hours) + ":";
	  }
	  formattedTime += padZero(minutes) + ":" + padZero(seconds);
	  return formattedTime;
	}
	function padZero(number) {
	  return number.toString().padStart(2, "0");
	}
	function qwerty() {
	  const container = document.getElementById("fields");
	  const dragButtons = document.querySelectorAll(".drag");
	  let isDragging = false;
	  let saveTimeout; // Variable to store the saveForm timeout

	  // Initialize dragula with the container
	  const drake = dragula([container], {
	    copy: false, // Disable cloning of dragged elements
	  });

	  // Create autoScroll instance
	  const scroll = autoScroll([
	    window,
	    container
	  ], {
	    margin: 20,
	    autoScroll: function() {
	      return this.down && drake.dragging;
	    }
	  });

	  // Handle drag event
	  drake.on("drag", function(el) {
	    if (isDragging) {
	      // Add the dragging class
	      el.classList.add("dragging");
	    } else {
	      // Cancel the drag operation
	      drake.cancel();
	    }
	  });

	  // Handle dragend event
	  drake.on("dragend", function(el) {
	    // Remove the dragging class
	    el.classList.remove("dragging");

	    // If dragging occurred, save the form after a delay
	    if (isDragging) {
	      clearTimeout(saveTimeout);
	      saveTimeout = setTimeout(function() {
	        saveForm(new Event("click"));
	      }, 100); // Adjust the delay as needed
	    }

	    // Set the isDragging flag to false
	    isDragging = false;
	  });

	  // Add event listeners to the drag buttons
	  dragButtons.forEach((button) => {
	    // Handle mousedown event on drag button
	    button.addEventListener("mousedown", function() {
	      // Set the isDragging flag to true
	      isDragging = true;
	    });

	    // Handle mouseup event on drag button
	    button.addEventListener("mouseup", function() {
	      // Set the isDragging flag to false
	      isDragging = false;

	      // Save the form after mouseup
	      saveForm(new Event("click"));
	    });

	    // Handle touchstart event on drag button
	    button.addEventListener("touchstart", function(event) {
	      // Prevent default touch behavior and set the isDragging flag to true
	      event.preventDefault();
	      isDragging = true;
	    });

	    // Handle touchend event on drag button
	    button.addEventListener("touchend", function() {
	      // Set the isDragging flag to false
	      isDragging = false;

	      // Save the form after touchend with a delay
	      clearTimeout(saveTimeout);
	      saveTimeout = setTimeout(function() {
	        saveForm(new Event("click"));
	      }, 100); // Adjust the delay as needed
	    });
	  });

	  // Prevent touchmove event default behavior when dragging
	  document.addEventListener("touchmove", function(event) {
	    if (isDragging) {
	      event.preventDefault();
	    }
	  }, { passive: false });
	}

	function onYouTubeIframeAPIReady() {
	    if (!player) {
	    	player = new YT.Player('player', {
				height: "250vh",
				width: "100%",
	        videoId: '{{link}}',
	        playerVars: {
	            'playsinline': 1,
	            'fs': 0,
	            'iv_load_policy': 3
	        },
	        events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	        }
	    });
	    }
	    return player;
	}
	function onPlayerReady(event) {
	    event.target.playVideo();
	}
	function onPlayerStateChange(event) {
	    // Handle player state change events
	    // For example, you can perform actions based on the player's state
	    if (event.data === YT.PlayerState.PLAYING) {
	        console.log('Player is playing');
	    } else if (event.data === YT.PlayerState.PAUSED) {

	    } else if (event.data === YT.PlayerState.ENDED) {
	        console.log('Player has ended');
	    };
	};


	function showInputField() {
    // Show the input field container
    document.getElementById('inputFieldContainer').style.display = 'block';
  }

	function updatePlayer() {
	  var youtubeLink = document.getElementById('videoInput').value;
	  var videoId = extractVideoId(youtubeLink);

	  if (player) {
	    // Update the videoId and load the new video
	    player.loadVideoById(videoId);

	    // Send the new video ID to the server
	    let form = document.querySelector('form');
	    document.querySelector("#video-Id").value = videoId;
	    let formData = new FormData(form);
	    formData.set('video_Id', videoId);


	    fetch(form.action, {
	      method: form.method,
	      body: formData
	    })
	      .then(function(response) {
	        if (response.ok) {
	          console.log('Video ID updated successfully');
	        } else {
	          console.log('Video ID update failed');
	        }
	      })
	      .catch(function(error) {
	        console.error('Error updating video ID:', error);
	      });
	  }
	  saveForm(new Event("click"));
	}


  // Helper function to extract the videoId from YouTube link
	function extractVideoId(link) {
	  // Check if the link is in the format: https://www.youtube.com/watch?v=VIDEO_ID
	  var match = link.match(/youtube\.com\/watch\?v=([^&]+)/);
	  if (match) {
	    return match[1];
	  }

	  // Check if the link is in the format: https://youtu.be/VIDEO_ID
	  match = link.match(/youtu\.be\/([^?]+)/);
	  if (match) {
	    return match[1];
	  }

	  // Check if the link is in the format: https://www.youtube.com/live/VIDEO_ID
	  match = link.match(/youtube\.com\/live\/([^?]+)/);
	  if (match) {
	    return match[1];
	  }

	  // If no match is found, return null or handle the error as needed
	  return null;
	}