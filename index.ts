// import { MyBucketFirstExample } from "./resourses/bucket";
//
// new MyBucketFirstExample({
//   bucketName: "example-bucket-name",
//   product: "devops-learning",
// });

import { MyBucketFirstExampleFE } from "./services/frontend";

function main(): void {
  new MyBucketFirstExampleFE({
    bucketName: "FE",
    product: "fe-product-devops",
  });
}

main();
