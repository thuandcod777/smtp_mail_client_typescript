export default class CompositisionRoot {
    private static client;
    private static redisClient;
    static configure(): Promise<void>;
    static otpRouter(): import("express").Router;
    static authRouter(): import("express").Router;
}
//# sourceMappingURL=composition.d.ts.map