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

    const source = new MyBucketFirstExample(
      {
        bucketName: args.bucketName,
        product: args.product,
      },
      { parent: this },
    );
    const sourceReplica = new MyBucketFirstExample(
      {
        bucketName: `${args.bucketName}-replica`,
        product: args.product,
      },
      { parent: this },
    );

    console.log(source);
    console.log(sourceReplica);
  }
}
