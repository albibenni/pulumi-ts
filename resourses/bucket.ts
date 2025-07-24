import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

type MyBucketFirstExampleArgs = {
  bucketName: string;
  product: string;
};

export class MyBucketFirstExample extends pulumi.ComponentResource {
  constructor(
    args: MyBucketFirstExampleArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    const resourceName = `${args.product}-${args.bucketName}`;

    super("my:bucket:MyBucketFirstExample", resourceName, {}, opts);

    const stack = pulumi.getStack();

    const bucketName = `${resourceName}-${stack}`;

    const bucketExample = new aws.s3.Bucket(
      args.bucketName, // pulumi name
      {
        acl: "private",
        bucket: bucketName, // amazon bucket name
        tags: {
          Environment: stack,
        },
      },
    );

    new aws.s3.BucketPublicAccessBlock(args.bucketName, {
      bucket: bucketExample.id,
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true,
    });
  }
}
