// for images - docker?

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

type DockerImageRepoArgs = {
  bucketName: string;
  product: string;
  immutable?: boolean;
};

// example for docker aws repo - ecr - https://www.pulumi.com/registry/packages/aws/api-docs/ecr/repository/

export class DockerImageRepo extends pulumi.ComponentResource {
  constructor(args: DockerImageRepoArgs, opts?: pulumi.CustomResourceOptions) {
    const resourceName = `${args.product}-${args.bucketName}`;

    super("pkg:index:DockerImageRepo", resourceName, {}, opts);

    //const stack = pulumi.getStack();
    //const ecrName = `${resourceName}-${stack}`; // no stack because docker can use tag - docker pull image-dev:latest
    new aws.ecr.Repository(
      args.bucketName,
      {
        name: resourceName,
        imageScanningConfiguration: {
          scanOnPush: false,
        },
        imageTagMutability: "MUTABLE",
      },
      {
        parent: this,
      },
    );
    // have a look at backend.ts
  }
}
