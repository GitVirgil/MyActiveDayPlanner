$(document).ready(function() {
  
  // Test-boolean
  const test = false;

  // Retrieve times using moment
  const now = moment().format('MMMM Do YYYY');

  // Commented out for test in non-standard hours
  let nowHour24 = moment().format('H');
  let nowHour12 = moment().format('h');

  // Set times for testing after hours
  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }

  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);
  
  // Font awesome icon https://fontawesome.com/license
  const saveIcon = "./images/save-regular.svg"; 


  // Parsing the JSON string to object
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (test) { console.log(storedPlans); } 

  // If plans were retrieved from localStorage, update the plan array to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } 

  if (test) { console.log("full array of planned text",planTextArr); }

  // Variable referencing planner element
  let $plannerDiv = $('#successplannerContainer');
  // Clear elements
  $plannerDiv.empty();

  if (test) { console.log("current time",nowHour12); }


  // Calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    //  Hours Off-set
    let index = hour - 9;
    
    // Build row
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // Time box portion of row
    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    // Time Box element (with time)
    const $timeBoxSpn = $('<span>');
    // Get value
    $timeBoxSpn.attr('class','timeBox');
    
    // if statement for time am-pm display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // Fill in Time Box with time via ${displayHour}
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);
    

    // Input portion of row
    // Row components
    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    // Get index from data array for hour 
    $dailyPlanSpn.val( planTextArr[index] );
    
    // Controls width
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    // Column width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);
    

    // Save row inputs code.
    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    // Column width and row component.
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);
    
    // Update row color/time
    updateRowColor($rowDiv, hour);
    
    // Row to planner container
    $plannerDiv.append($rowDiv);
  };

  // Local function to update row color
  function updateRowColor ($hourRow,hour) { 
// If-Else Statement
    if (test) { console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
      // $hourRow.css('')
      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };

  // Saves to local storage
  // onclick function to listen for user clicks.
  $(document).on('click','i', function(event) {
    event.preventDefault();  
//If-Else Statement
    if (test) { console.log('click pta before '+ planTextArr); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;
    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after '+ planTextArr); }

    
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));

  });  
  
  // Function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }

    // Check for save button via this
    let i = $(this).attr('hour-index');
  
  });
});


