export async function countdown(n) {
    if (n < 0) return; // Base case: stop when n is less than 0
    console.log(n);
    countdown(n - 1); // Recursive call with n-1
}
