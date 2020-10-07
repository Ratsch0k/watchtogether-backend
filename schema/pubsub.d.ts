import { RedisPubSub } from "graphql-redis-subscriptions";
import { PubSub } from "graphql-subscriptions";

declare const PubSub: PubSub | RedisPubSub;
export default PubSub;