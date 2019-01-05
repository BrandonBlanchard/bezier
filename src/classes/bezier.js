


export default class Bezier {
    static QuadraticBezier(n, t) {
        // takes in:
        //   t (percentage of the whole line)
        //   n an array of four points with x,y coords

        // n1 * (1-t)^3 + n2 * 3 * (1-t)^2 * t + n3 * 3 * (1-t) * t^2 + n4 * t^3
        return n[0] * Math.pow(1-t, 3) + 
               n[1] * 3 * Math.pow(1-t, 2) * t +
               // others n[i] * 3 * Math.pow(1-t, 2) +
               n[2] * 3 * (1 - t) * Math.pow(t,2) + 
               n[3] * Math.pow(t, 3);

        // returns:
        //  a single x, y, or z value 
    }
}