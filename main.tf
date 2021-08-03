provider "aws" {
  region                      = "ap-south-1"
  access_key                  = "fake"
  secret_key                  = "fake"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    apigateway     = "http://localstack:4566"
    cloudformation = "http://localstack:4566"
    cloudwatch     = "http://localstack:4566"
    iam            = "http://localstack:4566"
    kinesis        = "http://localstack:4566"
    lambda         = "http://localstack:4566"
    route53        = "http://localstack:4566"
    s3             = "http://localstack:4566"
  }
}


resource "aws_iam_role" "lambda_exec" {
  name               = "serverless_example_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


resource "aws_lambda_function" "test" {
  function_name = "getFunc"
  s3_bucket     = "sls-test"
  s3_key        = "apis.zip"
  handler       = "apis/test.handler"
  runtime       = "nodejs14.x"
  role          = aws_iam_role.lambda_exec.arn
}


resource "aws_lambda_function" "test2" {
  function_name = "getFunc2"
  s3_bucket     = "sls-test"
  s3_key        = "apis.zip"
  handler       = "apis/apiHandler.getAll"
  runtime       = "nodejs14.x"
  role          = aws_iam_role.lambda_exec.arn
}

