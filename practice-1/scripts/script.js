const arr = [10, 12, 15, 21];

for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
  }, 3000)
}

arr.forEach((element) => {
  setTimeout(() => {
    if (element > 13) {
      console.log(`Good: ${element}`);
    } else {
      console.log(`Bad: ${element}`);
    }
    }, 3000);
});

let i = 0;
while (i < arr.length) {
  const currentEl = arr[i]
  setTimeout(() =>{
    switch (true) {
      case (currentEl > 13):
        console.log(`Good: ${currentEl}`);
        break
      case (currentEl <= 13):
        console.log(`Bad: ${currentEl}`);
        break
    }
  }, 3000);
  i++
}

