/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:08
 * @version $ IIFE
 */

/* name module */

export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}