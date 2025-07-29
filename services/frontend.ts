import type { CustomResourceOptions } from "@pulumi/pulumi";
import { ComponentResource } from "@pulumi/pulumi";
import { MyBucketFirstExample } from "../resourses/bucket";

type MyBucketFEArgs = {
  bucketName: string;
  product: string;
};

export class MyBucketFirstExampleFE extends ComponentResource {
  constructor(args: MyBucketFEArgs, opts?: CustomResourceOptions) {
    const resourceName = `${args.product}-${args.bucketName}`;

    super("my:bucket:MyBucketFirstExampleFE", resourceName, {}, opts);

    new MyBucketFirstExample(
      {
        bucketName: args.bucketName,
        product: args.product,
        public: true,
      },
      { parent: this },
    );
    new MyBucketFirstExample(
      {
        bucketName: `${args.bucketName}-replica`,
        product: args.product,
      },
      { parent: this },
    );
  }
}
