// import { MyBucketFirstExample } from "./resourses/bucket";
//
// new MyBucketFirstExample({
//   bucketName: "example-bucket-name",
//   product: "devops-learning",
// });

import { BackendExample } from "./services/backend";
import { MyBucketFirstExampleFE } from "./services/frontend";

function main(): void {
  new MyBucketFirstExampleFE({
    bucketName: "FE",
    product: "fe-product-devops",
  });
  new BackendExample({
    bucketName: "BE",
    product: "BE-Image-devops",
  });
}

main();
